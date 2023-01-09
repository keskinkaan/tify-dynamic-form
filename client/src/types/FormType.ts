export const enum TType {
	text = 'text',
	number = 'number',
	date = 'date',
	select = 'select',
	radio = 'radio',
	checkbox = 'checkbox',
	file = 'file',
}

export type TFormElement = {
	type: TType;
	name: string;
	label: string;
	placeholder: string;
	value: string | string[];
	required: boolean;
	errorMessage: string;
	pattern?: string;
	options?: string[];
};

export type TForm = {
	formName: string;
	fields: TFormElement[];
};

export type setData = {
	name: string;
	value: string;
	checked?: boolean;
	type?: string;
};
