import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import status from 'http-status';
import Exceptions from '@/utils/exception.js';

const validations =
	(schema: Joi.Schema): RequestHandler =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const validationOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };
		try {
			const values = await schema.validateAsync(req.body, validationOptions);
			req.body = values;
			next();
		} catch (e: any) {
			const errors: string[] = [];
			e.details.map((error: Joi.ValidationError): void => {
				errors.push(error.message);
			});
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			next(new Exceptions(status.OK, errors));
			//res.status(status.BAD_REQUEST).json({ errors: errors });
		}
	};

export default validations;
