import { FetchAction, TFetch, TFetchReducerAction } from '@/types/FetchType';
import Logger, { LoggerType } from '@/utils/Logger';

//#region Reducer
export const fetchReducer = <R extends object>(state: TFetch<R>, action: TFetchReducerAction<R>) => {
	switch (action.type) {
		case FetchAction.START:
			if (!action.payload) {
				const message = 'action.payload missing in START action!!!';
				Logger.log(message, LoggerType.ERROR);
				return { ...state };
			} else {
				const { loading } = action.payload;
				return { ...state, loading };
			}
		case FetchAction.SUCCESS:
			if (!action.payload) {
				const message = 'action.payload missing in SUCCESS action!!!';
				Logger.log(message, LoggerType.ERROR);
				return { ...state };
			} else {
				const { data } = action.payload;
				return {
					...state,
					loading: false,
					data,
				};
			}
		case FetchAction.ERROR:
			if (!action.payload) {
				const message = 'action.payload missing in ERROR action!!!';
				Logger.log(message, LoggerType.ERROR);
				return { ...state };
			} else {
				const { error } = action.payload;
				return {
					...state,
					loading: false,
					error,
				};
			}
		default: {
			const message = 'No action payload in reducer!!!';
			Logger.log(message, LoggerType.ERROR);
			return { ...state };
		}
	}
};

export default fetchReducer;
//#endregion
