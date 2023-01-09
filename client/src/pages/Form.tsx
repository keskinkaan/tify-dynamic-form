import { SyntheticEvent, useContext } from 'react';
import useFetch from '@/hooks/useFetch';
import { TForm } from '@/types/FormType';
import { FormContext } from '@/context/FormContext';

import { isObject } from '@/utils/functions';
import Logger, { LoggerType } from '@/utils/Logger';
import FormInput from '@/components/FormInput';

const Form = () => {
	const [loading, error, form] = useFetch<TForm>('src/api/form.json');

	const { create } = useContext(FormContext);
	isObject<TForm>(form) && create(form);

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		e.preventDefault();
		const btn = e.nativeEvent.submitter;
		const cls = btn?.className;
		if (!cls) return;

		if (cls.indexOf('preview') >= 0) {
			Logger.log('Preview', LoggerType.INFO);
		} else {
			Logger.log('Submit', LoggerType.INFO);
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
							<button className="form-footer__submit" type="submit">
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
