/* eslint-disable no-case-declarations */
import useForm from '@/hooks/useForm';
import { setData, TForm, TFormElement, TType } from '@/types/FormType';
import { ChangeEvent, useState } from 'react';

const FormInput = (props: TFormElement) => {
	const { label, name, errorMessage, required, value, type, options, ...inputProps } = props;

	const [fieldValue, setForm] = useForm((store: TForm) => {
		const field = store.fields.find((field) => {
			return field.name === name;
		});
		if (field !== undefined) return field.value;
	});

	const [focused, setFocused] = useState(false);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		switch (e.target.type) {
			case TType.checkbox:
				setForm({
					name: e.target.name,
					value: e.target.value,
					type: e.target.type,
					checked: (e.target as HTMLInputElement).checked,
				} as setData);
				break;
			case TType.radio:
				setForm({
					name: name,
					value: e.target.value,
					type: e.target.type,
				} as setData);
				break;
			case TType.file:
				const fileList = (e.target as HTMLInputElement).files;
				if (!fileList) return;

				const file = fileList[0];

				const fileReader = new FileReader();

				fileReader.addEventListener('load', (file) => {
					const value = file.target?.result as string;
					setForm({
						name: e.target.name,
						value: value,
						type: e.target.type,
					} as setData);
				});
				fileReader.readAsDataURL(file);
				break;
			default: {
				setForm({
					name: e.target.name,
					value: e.target.value,
				} as setData);
				break;
			}
		}
	};

	const renderFieldInputSwitch = (type: string) => {
		switch (type) {
			case TType.file:
				return (
					<>
						<input
							className="form-body__control"
							type={type}
							accept="image/png, image/jpeg"
							required={required}
							name={name}
							onChange={handleOnChange}
							multiple={false}
							onBlur={(e) => setFocused(true)}
							data-focused={focused.toString()}
							{...inputProps}
						/>
						<span className="form-body__error">{errorMessage}</span>
					</>
				);
			case TType.select:
				return (
					<>
						<select
							className="form-body__control"
							required={required}
							name={name}
							value={fieldValue}
							onChange={handleOnChange}
							onBlur={(e) => setFocused(true)}
							data-focused={focused.toString()}
							{...inputProps}>
							<option value="">Plase Select</option>
							{options?.map((opt, i) => {
								return (
									<option key={i} value={opt}>
										{opt}
									</option>
								);
							})}
						</select>
						<span className="form-body__error">{errorMessage}</span>
					</>
				);
			case TType.radio:
				return (
					<>
						{options &&
							options.map((opt, i) => {
								return (
									<div key={i} className="form-body__check">
										<input
											className="form-body__check-input"
											id={options[i].replaceAll(' ', '')}
											type={type}
											required={required}
											name={name}
											value={options[i] === fieldValue ? fieldValue : options[i]}
											defaultChecked={
												Array.isArray(fieldValue)
													? fieldValue.find((opt) => options[i] === opt)
														? true
														: false
													: options[i] === fieldValue
													? true
													: false
											}
											onChange={handleOnChange}
											onBlur={(e) => setFocused(true)}
											data-focused={focused.toString()}
											{...inputProps}
										/>
										<label className="form-body__check-label" htmlFor={options[i].replaceAll(' ', '')}>
											{options[i]}
										</label>
									</div>
								);
							})}
						<span className="form-body__error">{errorMessage}</span>
					</>
				);
			case TType.checkbox:
				return (
					<>
						{options &&
							options.map((opt, i) => {
								return (
									<div key={i} className="form-body__check">
										<input
											className="form-body__check-input"
											id={options[i].replaceAll(' ', '')}
											type={type}
											required={required}
											name={name}
											value={options[i]}
											defaultChecked={
												Array.isArray(fieldValue)
													? fieldValue.find((opt) => options[i] === opt)
														? true
														: false
													: options[i] === fieldValue
													? true
													: false
											}
											onChange={handleOnChange}
											onBlur={(e) => setFocused(true)}
											data-focused={focused.toString()}
											{...inputProps}
										/>
										<label className="form-body__check-label" htmlFor={options[i].replaceAll(' ', '')}>
											{options[i]}
										</label>
									</div>
								);
							})}
						<span className="form-body__error">{errorMessage}</span>
					</>
				);
			default: {
				return (
					<>
						<input
							className="form-body__control"
							type={type}
							required={required}
							name={name}
							value={fieldValue}
							onChange={handleOnChange}
							multiple={false}
							onBlur={(e) => setFocused(true)}
							data-focused={focused.toString()}
							{...inputProps}
						/>
						<span className="form-body__error">{errorMessage}</span>
					</>
				);
			}
		}
	};
	return (
		<div className="form-body">
			<label className="form-body__label" htmlFor="{name}">
				{label}
				{required ? '*' : ''}
			</label>
			{renderFieldInputSwitch(type)}
		</div>
	);
};

export default FormInput;
