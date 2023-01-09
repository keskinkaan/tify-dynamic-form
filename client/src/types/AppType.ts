import { ReactElement, ReactNode } from 'react';

export type ReducerActionMap<M extends { [index: string]: unknown }> = {
	[Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};

export type ChildrenType = {
	children?: ReactNode | ReactElement | ReactElement[] | JSX.Element | undefined;
};

export type KeyValueType = {
	[key: string]: string;
};
