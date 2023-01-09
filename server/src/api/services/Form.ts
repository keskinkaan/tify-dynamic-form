import IForm from '@/interfaces/IForm.js';
import Logger from '@/config/log/Logger.js';
import fs from 'fs';
import path from 'path';

class CountryService {
	public create = async (form: IForm): Promise<IForm | Error> => {
		try {
			fs.writeFile('data.json', JSON.stringify(form), (err) => {
				if (err) {
					console.error(err);
				}
			});
			return form;
		} catch (err: any) {
			const logger = Logger.getInstance('Services-CreateForm', 'Form');
			logger.error('', err);
			throw new Error(err.message);
		}
	};
}

export default CountryService;
