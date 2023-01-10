import { SyntheticEvent, useContext, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { TForm } from '@/types/FormType';
import { FormContext } from '@/context/FormContext';

import { isObject } from '@/utils/functions';
import FormInput from '@/components/FormInput';
import useModal from '@/hooks/useModal';

const Form = () => {
	const [loading, error, form] = useFetch<TForm>('src/api/form.json');
	const [success, setSuccess] = useState(false);

	const { create, get } = useContext(FormContext);
	isObject<TForm>(form) && create(form);

	const { append } = useModal();

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		e.preventDefault();
		const btn = e.nativeEvent.submitter;
		const cls = btn?.className;
		if (!cls) return;

		if (cls.indexOf('preview') >= 0) {
			append({ name: 'PreviewForm', data: {} });
		} else {
			setSuccess(true);
			const data = get();
			const sendData = {};
			data.fields.map((field, i) => {
				return Object.assign(sendData, { [field.name]: field.value });
			});

			fetch('http://localhost:3002/api/form', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendData),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					} else {
						return response.json();
					}
				})
				.then((result) => {
					setSuccess(false);
				})
				.catch((err: Error) => {
					setSuccess(false);
				});
		}
	};

	return (
		<>
			{!loading ? (
				!error ? (
					<form className="form" onSubmit={handleSubmit}>
						<h2 className="form-header">{isObject<TForm>(form) ? form.formName : ''}</h2>
						{isObject<TForm>(form) ? (
							form.fields.map((field, i) => <FormInput key={i} {...field} />)
						) : (
							<div className="form-body">
								<p>Something went wrong. Please try again later.</p>
							</div>
						)}
						<div className="form-footer">
							<button className="form-footer__preview" type="submit">
								Preview
							</button>
							<button className="form-footer__submit" type="submit" disabled={success ? true : false}>
								Submit
							</button>
						</div>
					</form>
				) : (
					<p>Something went wrong. Please try again later.</p>
				)
			) : (
				<div className="loader">
					<span className="loader-spinner"></span>
				</div>
			)}
		</>
	);
};

export default Form;
