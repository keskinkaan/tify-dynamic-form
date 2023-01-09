import Form from '@/pages/Form';
import FormContextProvider from '@/context/FormContext';
import useModal from '@/hooks/useModal';
import Modal from '@/components/modals';

function App() {
	const { state } = useModal();
	return (
		<FormContextProvider>
			{state.modals.length > 0 ? <Modal /> : ''}
			<div className="app">
				<Form />
			</div>
		</FormContextProvider>
	);
}

export default App;
