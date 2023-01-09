import { ChildrenType } from '@/types/AppType';
import { TForm, setData, TType } from '@/types/FormType';
import { createContext, useCallback, useRef } from 'react';

const initFormState: TForm = {
	formName: '',
	fields: [],
};

export const useFormContext = (initFormState: TForm) => {
	const formStore = useRef(initFormState);

	const create = useCallback((data: TForm) => {
		formStore.current = data;
	}, []);

	const get = useCallback(() => formStore.current, []);

	const subscribers = useRef(new Set<() => void>());

	const set = useCallback((setData: setData) => {
		const { name, value, type, checked } = setData;
		const field = formStore.current.fields.find((field) => {
			return name === field.name;
		});
		if (field !== undefined) {
			if (type === TType.checkbox) {
				if (Array.isArray(field.value)) {
					if (checked) field.value = [...field.value, value];
					else field.value = field.value.filter((opt) => ![value].includes(opt));
					subscribers.current.forEach((callback) => callback());
				} else {
					field.value = [value];
					subscribers.current.forEach((callback) => callback());
				}
			} else {
				field.value = value;
				subscribers.current.forEach((callback) => callback());
			}
		}
	}, []);

	const subscribe = useCallback((callback: () => void) => {
		subscribers.current.add(callback);
		return () => subscribers.current.delete(callback);
	}, []);

	return {
		create,
		get,
		set,
		subscribe,
	};
};

export type UseFormContextReturnType = ReturnType<typeof useFormContext>;

const initFormContextState: UseFormContextReturnType = {
	create: (data: TForm) => {},
	get: () => initFormState,
	set: (value: setData) => {},
	subscribe: (callback: () => void) => () => false,
};

export const FormContext = createContext<UseFormContextReturnType>(initFormContextState);

const FormContextProvider = ({ children }: ChildrenType) => {
	return <FormContext.Provider value={useFormContext(initFormState)}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
