import { Request, Response, NextFunction } from 'express';
import Exception from 'api/utils/exception';

const errors = (error: Exception, req: Request, res: Response, next: NextFunction): void => {
	const status = error.status || 500;
	const message: string = error.message || 'Something went wrong';
	res.status(status).json({
		success: 0,
		error: {
			status,
			message,
		},
	});
};

export default errors;
