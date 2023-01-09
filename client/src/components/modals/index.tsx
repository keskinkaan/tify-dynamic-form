import modalData from '@/utils/modals';
import useModal from '@/hooks/useModal';

const Modal = () => {
	const { state } = useModal();
	return (
		<div className="modal">
			{state.modals.map((modal, i) => {
				const m = modalData.find((m) => m.name === modal.name);
				return (
					!!m && (
						<div key={i} className="modal-content">
							<m.element />
						</div>
					)
				);
			})}
		</div>
	);
};

export default Modal;
