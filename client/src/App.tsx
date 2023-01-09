import Form from '@/pages/Form';
import FormContextProvider from '@/context/FormContext';

function App() {
	return (
		<FormContextProvider>
			<div className="app">
				<Form />
			</div>
		</FormContextProvider>
	);
}

export default App;
