import { TFormElement, TType } from '@/types/FormType';
import Logger, { LoggerType } from '@/utils/Logger';
import { ChangeEvent, useState } from 'react';

const FormInput = (props: TFormElement) => {
	const { label, name, errorMessage, required, value, type, options, ...inputProps } = props;

	const [focused, setFocused] = useState(false);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		Logger.log('Changed', LoggerType.INFO);
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
							value={value}
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
											value={options[i] === value ? value : options[i]}
											defaultChecked={
												Array.isArray(value)
													? value.find((opt) => options[i] === opt)
														? true
														: false
													: options[i] === value
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
												Array.isArray(value)
													? value.find((opt) => options[i] === opt)
														? true
														: false
													: options[i] === value
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
							value={value}
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
			{label}
			{required ? '*' : ''}
			<label className="form-body__label" htmlFor="{name}"></label>
			{renderFieldInputSwitch(type)}
		</div>
	);
};

export default FormInput;
