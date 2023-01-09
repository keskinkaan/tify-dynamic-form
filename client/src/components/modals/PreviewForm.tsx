import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';

import Field from './Field';

const Preview = () => {
	const [allData] = useForm((store) => store);
	const { destroy } = useModal();

	return (
		<>
			<div className="modal-content__header">
				<h4>{allData.formName}</h4>
				<button className="modal-content__header-close" onClick={() => destroy('PreviewForm')}>
					X
				</button>
			</div>
			<div className="modal-content__body">
				{allData.fields.map((field, i) => {
					return <Field key={i} type={field.type} label={field.label} name={field.name} />;
				})}
			</div>

			<div className="modal-content__footer">
				<button className="modal-content__footer-edit" onClick={() => destroy('PreviewForm')}>
					Close
				</button>
			</div>
		</>
	);
};

export default Preview;
