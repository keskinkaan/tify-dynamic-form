import { ModalContext } from '@/context/ModalContext';
import { useContext } from 'react';

const useModal = () => {
	const { getModal, state, append, destroy, destroyAll } = useContext(ModalContext);

	return { getModal, state, append, destroy, destroyAll };
};

export default useModal;
