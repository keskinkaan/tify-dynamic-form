import modalReducer from '@/reducer/modalReducer';
import { ChildrenType } from '@/types/AppType';
import { ModalAction, TModal, TModalState } from '@/types/ModalType';
import { createContext, useCallback, useReducer } from 'react';

const initModalState: TModalState = { modals: [] };

export const useModalContext = (initModalState: TModalState) => {
	const [state, dispatch] = useReducer(modalReducer, initModalState);

	const getModal = (name: TModal['name']) => {
		const modal = state.modals.find((modal) => modal.name === name);
		return modal !== undefined ? modal : `${name} modal not found!!!`;
	};

	const append = useCallback((modal: TModal) => {
		dispatch({
			type: ModalAction.APPEND,
			payload: {
				name: modal.name,
				data: modal.data,
			},
		});
	}, []);

	const destroy = useCallback((name: TModal['name']) => {
		dispatch({
			type: ModalAction.DESTROY,
			payload: {
				name: name,
			},
		});
	}, []);

	const destroyAll = useCallback(() => {
		dispatch({
			type: ModalAction.DESTROYALL,
		});
	}, []);

	return { getModal, state, append, destroy, destroyAll };
};

type UseModalContextReturnType = ReturnType<typeof useModalContext>;

const initModalContextState: UseModalContextReturnType = {
	getModal: (name: TModal['name']) => {
		return '';
	},
	state: initModalState,
	append: (modal: TModal) => {},
	destroy: (name: TModal['name']) => {},
	destroyAll: () => {},
};

export const ModalContext = createContext<UseModalContextReturnType>(initModalContextState);

const ModalContextProvider = ({ children }: ChildrenType) => {
	return <ModalContext.Provider value={useModalContext(initModalState)}>{children}</ModalContext.Provider>;
};

export default ModalContextProvider;
