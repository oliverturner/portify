import { assign, createMachine } from "xstate";

export const infiniteScrollMachine = (context, options) =>
	createMachine(
		{
			id: "infiniteScroll",
			initial: "fetchingRowOfData",
			context,
			states: {
				fetchingRowOfData: {
					on: {
						RECEIVED_DATA: {
							target: "checkingIfThereIsMoreData",
							actions: ["assignDataToContext"],
						},
					},
					invoke: {
						src: "fetchRowOfData",
						onError: {
							target: "idle",
							actions: "assignErrorMessageToContext",
						},
					},
				},
				idle: {
					exit: ["clearErrorMessage"],
					on: {
						SCROLL_TO_BOTTOM: "fetchingRowOfData",
					},
				},
				checkingIfThereIsMoreData: {
					always: [
						{
							cond: "thereIsMoreData",
							target: "idle",
						},
						{
							target: "noMoreDataToFetch",
						},
					],
				},
				noMoreDataToFetch: {
					type: "final",
				},
			},
		},
		{
			guards: {
				thereIsMoreData: (context) => {
					return !!context.next;
				},
			},
			services: {
				fetchRowOfData: () => async (send) => {
					const res = await fetch(context.next);
					const data = await res.json();
					send({ type: "RECEIVED_DATA", data });
				},
			},
			actions: {
				assignDataToContext: assign((context, event) => {
					if (event.type !== "RECEIVED_DATA") return {};

					const { items: currentItems } = context;
					const { items: newItems } = event.data;
					const newData = {
						...event.data,
						items: currentItems.concat(newItems),
					};

					return newData;
				}),
				clearErrorMessage: assign((context) => ({
					errorMessage: undefined,
				})),
				assignErrorMessageToContext: assign((context, event) => {
					return {
						errorMessage: event.data?.message || "An unknown error occurred",
					};
				}),
			},
		}
	);
