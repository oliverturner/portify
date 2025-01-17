import { assign, createMachine } from "xstate";
import { choose } from "xstate/lib/actions";

/** @type {import("@typings/machines").PaginationMachine} */
export const paginationMachine = createMachine(
	{
		id: "pagination",
		initial: "awaitingTotalPages",
		context: {
			currentPage: 1,
		},
		on: {
			UPDATE_TOTAL_PAGES: {
				cond: "newTotalPagesIsValidValue",
				actions: choose([
					{
						cond: "currentPageIsAboveNewTotalPages",
						actions: ["assignTotalPagesToContext", "goToFirstPage"],
					},
					{
						actions: ["assignTotalPagesToContext"],
					},
				]),
				target: "idle",
			},
		},
		states: {
			awaitingTotalPages: {},
			idle: {
				on: {
					NEXT_PAGE: {
						cond: "canGoToNextPage",
						actions: "goToNextPage",
					},
					PREV_PAGE: {
						cond: "canGoToPrevPage",
						actions: "goToPrevPage",
					},
					GO_TO_TARGET_PAGE: {
						actions: "goToTargetPage",
						cond: "targetPageIsWithinBounds",
					},
				},
			},
		},
	},
	{
		guards: {
			newTotalPagesIsValidValue: (context, event) => {
				if (event.type !== "UPDATE_TOTAL_PAGES") return false;

				return event.totalPages > 0;
			},
			currentPageIsAboveNewTotalPages: (context, event) => {
				if (event.type !== "UPDATE_TOTAL_PAGES") return false;

				return context.currentPage > event.totalPages;
			},
			canGoToNextPage: (context) => {
				return context.currentPage < context.totalPages;
			},
			canGoToPrevPage: (context) => {
				return context.currentPage > 1;
			},
			targetPageIsWithinBounds: (context, event) => {
				if (event.type !== "GO_TO_TARGET_PAGE") return false;
				return event.targetPage >= 1 && event.targetPage <= context.totalPages;
			},
		},
		actions: {
			goToFirstPage: assign({
				currentPage: 1,
			}),
			goToPrevPage: assign({
				currentPage: (context) => context.currentPage - 1,
			}),
			goToNextPage: assign({
				currentPage: (context) => context.currentPage + 1,
			}),
			goToTargetPage: assign((context, event) => {
				if (event.type !== "GO_TO_TARGET_PAGE") return {};

				return {
					currentPage: event.targetPage,
				};
			}),
			assignTotalPagesToContext: assign((context, event) => {
				if (event.type !== "UPDATE_TOTAL_PAGES") return {};
				return {
					totalPages: event.totalPages,
				};
			}),
		},
	}
);
