//#region Types
export const enum FetchAction {
	START = 'START',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export enum MethodName {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

export type TResponse<R> = {
	success: number;
	results: R;
	error: TError;
};

export type TError = {
	message: string;
	status: number;
};

export type TFetch<R extends object> = {
	error?: boolean | string;
	loading?: boolean;
	data?: R | unknown;
};

export type TFetchReducerAction<R extends object> = {
	type: FetchAction;
	payload: TFetch<R>;
};
//#endregion
