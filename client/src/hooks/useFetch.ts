import { useEffect, useReducer } from 'react';
import { FetchAction, MethodName, TFetch, TResponse } from '@/types/FetchType';
import { fetchReducer } from '@/reducer/fetchReducer';
import Logger, { LoggerType } from '@/utils/Logger';
import axios from 'axios';

const useFetch = <R extends object>(
	url: string,
	method: MethodName = MethodName.GET,
	params: object | boolean = false,
	auth = false,
	loadOnStart = true,
) => {
	const initFetchState = {
		loading: true,
		error: false,
		data: undefined,
	} satisfies TFetch<R>;

	const [state, dispatch] = useReducer(fetchReducer, initFetchState);

	useEffect(() => {
		if (loadOnStart) {
			startFetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const request = () => {
		startFetch();
	};

	const startFetch = () => {
		axios
			.get<TResponse<R>>(`${import.meta.env.BASE_URL}${url}`)
			.then((response) => {
				const res = response.data;
				if (res.success === 1) {
					dispatch({
						type: FetchAction.SUCCESS,
						payload: { loading: true, data: res.results, error: false },
					});
					return res.results;
				} else {
					dispatch({
						type: FetchAction.ERROR,
						payload: { loading: false, data: undefined, error: res.error.message },
					});
					return `${res.error.status} - ${res.error.message}`;
				}
			})
			.catch((err) => {
				if (err instanceof Error) {
					dispatch({ type: FetchAction.ERROR, payload: { loading: false, data: undefined, error: true } });
					Logger.log(err.message, LoggerType.WARN);
					return err.message;
				} else {
					dispatch({ type: FetchAction.ERROR, payload: { loading: false, data: undefined, error: true } });
					Logger.log('Unknown error occurred. Please try again later.', LoggerType.ERROR);
					return 'Unknown error occurred. Please try again later.';
				}
			});
	};

	return [state.loading, state.error, state.data as R, request];
};

export default useFetch;
