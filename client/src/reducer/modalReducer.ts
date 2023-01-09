import { ModalAction, TModalReducerAction, TModal, TModalState } from '@/types/ModalType';
import Logger, { LoggerType } from '@/utils/Logger';

const modalReducer = (state: TModalState, action: TModalReducerAction): TModalState => {
	switch (action.type) {
		case ModalAction.APPEND:
			if (!action.payload) {
				const message = 'action.payload missing in ADD action!!!';
				Logger.log(message, LoggerType.ERROR);
				return { ...state };
			} else {
				const { name, data } = action.payload;
				const filteredModal: TModal[] = state.modals.filter((modal) => modal.name !== name);
				const modalInUse: TModal | undefined = state.modals.find((modal) => modal.name === name);
				if (modalInUse === undefined) {
					return {
						...state,
						modals: [...filteredModal, { name, data }],
					};
				} else {
					const message = `${name} modal is open!!!`;
					Logger.log(message, LoggerType.ERROR);
					return { ...state };
				}
			}
		case ModalAction.DESTROY:
			if (!action.payload) {
				const message = 'action.payload missing in REMOVE action!!!';
				Logger.log(message, LoggerType.ERROR);
				return { ...state };
			} else {
				const { name } = action.payload;
				const filteredModal: TModal[] = state.modals.filter((modal) => modal.name !== name);
				if (filteredModal === undefined) {
					return { ...state, modals: [] };
				} else {
					return { ...state, modals: [...filteredModal] };
				}
			}
		case ModalAction.DESTROYALL:
			return { ...state, modals: [] };
		default: {
			const message = 'No action payload in reducer!!!';
			Logger.log(message, LoggerType.ERROR);
			return { ...state };
		}
	}
};

export default modalReducer;
