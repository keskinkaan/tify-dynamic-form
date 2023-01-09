import ReactDOM from 'react-dom/client';
import App from './App';
import ModalContextProvider from '@/context/ModalContext';
import './styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ModalContextProvider>
		<App />
	</ModalContextProvider>,
);
