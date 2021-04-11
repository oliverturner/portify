import { StateMachine, Sender } from 'xstate';

// Infinite Scroll
export interface InfiniteScrollMachineContext {
  data: Data[];
  totalEntries: number;
  errorMessage?: string;
}

interface Data {
  id: number;
}

export type InfiniteScrollMachineEvent =
  | {
      type: 'SCROLL_TO_BOTTOM';
    }
  | {
      type: 'RECEIVED_DATA';
      data: Data[];
      totalEntries: number;
    };

export type InfiniteScrollMachine = StateMachine<
	InfiniteScrollMachineContext,
	any,
	InfiniteScrollMachineEvent,
	{
		value: any;
		context: InfiniteScrollMachineContext;
	}
>;

// Pagination
export interface PaginationMachineContext {
	totalPages?: number;
	/**
	 * This page is 1-indexed, not 0-indexed
	 */
	currentPage: number;
}

export type PaginationMachineEvent =
	| {
			type: "UPDATE_TOTAL_PAGES";
			totalPages: number;
	  }
	| {
			type: "NEXT_PAGE";
	  }
	| {
			type: "PREV_PAGE";
	  }
	| {
			type: "GO_TO_TARGET_PAGE";
			targetPage: number;
	  };

export type PaginationMachine = StateMachine<
	PaginationMachineContext,
	any,
	PaginationMachineEvent,
	{
		value: any;
		context: PaginationMachineContext;
	}
>;

export as namespace XStateCatalogue;
