import useForm from '@/hooks/useForm';
import { TForm, TType } from '@/types/FormType';
import { convertDate } from '@/utils/functions';

export interface IFieldProps {
	type: string;
	label: string;
	name: string;
}
const Field: React.FunctionComponent<IFieldProps> = (props) => {
	const { type, label, name } = props;

	const [fieldValue] = useForm((store: TForm) => {
		const field = store.fields.find((field) => field.name === name);
		if (field !== undefined) return field.value;
	});
	const renderFieldSwitch = (type: string) => {
		switch (type) {
			case TType.date:
				return (
					<>
						<b>:</b>
						<p data-name={name}>{convertDate(fieldValue as string)}</p>
					</>
				);
			case TType.file:
				return (
					<>
						<b>:</b>
						{fieldValue && (
							<img src={fieldValue as string} alt="" width="100px" height="100px" data-name={name} />
						)}
					</>
				);
			case TType.checkbox:
				return (
					<>
						<b>:</b>
						{Array.isArray(fieldValue) ? (
							fieldValue.length > 0 ? (
								<ul data-name={name}>
									{fieldValue.map((val, i) => (
										<li key={i}>&#x2611; {val}</li>
									))}
								</ul>
							) : (
								<ul>
									<li>-</li>
								</ul>
							)
						) : (
							<p>-</p>
						)}
					</>
				);
			default: {
				return (
					<>
						<b>:</b>
						<p>{fieldValue}</p>
					</>
				);
			}
		}
	};
	return (
		<div className="modal-content__body-list">
			<label>{label}</label>
			{renderFieldSwitch(type)}
		</div>
	);
};

export default Field;
