import { FormContext } from '@/context/FormContext';
import { setData, TForm } from '@/types/FormType';
import { useContext, useSyncExternalStore } from 'react';

const useForm = <T>(selector: (formStore: TForm) => T): [T, (value: setData) => void] => {
	const formStore = useContext(FormContext);

	if (!formStore) {
		const message = 'Store not found';
		throw new Error(message);
	}

	const state = useSyncExternalStore(formStore.subscribe, () => selector(formStore.get()));

	return [state, formStore.set];
};

export default useForm;
