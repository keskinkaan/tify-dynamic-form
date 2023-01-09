import useFetch from '@/hooks/useFetch';
import { TForm } from '@/types/FormType';

const Form = () => {
	const [loading, error, form] = useFetch<TForm>('src/api/form.json');

	return (
		<>
			{!loading ? (
				!error ? (
					<div></div>
				) : (
					<p>Something went wrong. Please try again later.</p>
				)
			) : (
				<div className="loader">
					<span className="loader-spinner"></span>
				</div>
			)}
		</>
	);
};

export default Form;
