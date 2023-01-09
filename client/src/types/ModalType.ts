export const enum ModalAction {
	APPEND = 'APPEND',
	DESTROY = 'DESTROY',
	DESTROYALL = 'DESTROYALL',
}

export type TModal = {
	name: string;
	data?: object;
};

export type TModalState = { modals: TModal[] };

export type TModalReducerAction = {
	type: ModalAction;
	payload?: TModal;
};

export type TModals = {
	name: string;
	element: () => JSX.Element;
};
