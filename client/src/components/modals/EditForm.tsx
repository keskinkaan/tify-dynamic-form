import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';
import FormInput from '../FormInput';

const EditForm = () => {
	const [allData] = useForm((store) => store);
	const { destroy } = useModal();

	return (
		<>
			<div className="modal-content__header">
				<h4>{allData.formName}</h4>
				<button className="modal-content__header-close" onClick={() => destroy('EditForm')}>
					X
				</button>
			</div>
			<div className="modal-content__body">
				<form className="form" onSubmitCapture={(e) => e.preventDefault()}>
					{allData.fields.map((field, i) => {
						return <FormInput key={i} {...field} />;
					})}
				</form>
			</div>

			<div className="modal-content__footer">
				<button className="modal-content__footer-edit">Save</button>
			</div>
		</>
	);
};

export default EditForm;
