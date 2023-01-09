import { Router, Request, Response, NextFunction } from 'express';
import status from 'http-status';

import IController from '@/interfaces/IApp.js';
import FormServices from '@/services/Form.js';
import Exceptions from '@/utils/exception.js';
import validations from '@/middlewares/validations.js';
import validation from '@/validations/Form.js';
import success from '@/middlewares/successHandler.js';

class Form implements IController {
	public path = '/form';
	public router = Router();
	#formServices = new FormServices();

	constructor() {
		this.#initialiseRoutes();
	}

	#initialiseRoutes = (): void => {
		this.router.post(`${this.path}`, validations(validation.create), this.#create);
	};

	#create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { name, surname, dateOfBirth, age, country, martialStatus, hobbies, profilePicture } = req.body;

			const results = await this.#formServices.create({
				name,
				surname,
				dateOfBirth,
				age,
				country,
				martialStatus,
				hobbies,
				profilePicture,
			});

			res.status(status.CREATED).json(success(results));
		} catch (err: any) {
			next(new Exceptions(status.BAD_REQUEST, err.message));
		}
	};
}

export default Form;
