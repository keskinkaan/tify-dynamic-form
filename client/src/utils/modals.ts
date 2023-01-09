import PreviewFormModal from '@/components/modals/PreviewForm';
import EditFormModal from '@/components/modals/EditForm';
import { TModals } from '@/types/ModalType';

const modals: TModals[] = [
	{
		name: 'PreviewForm',
		element: PreviewFormModal,
	},
	{
		name: 'EditForm',
		element: EditFormModal,
	},
];

export default modals;
