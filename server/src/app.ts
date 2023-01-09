import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import IController from '@/interfaces/IApp.js';
import Logger from '@/config/log/Logger.js';
import errorHandler from '@/middlewares/errorHandler.js';

class App {
	public express: Application;
	public port: number;

	constructor(controllers: IController[], port: number) {
		this.express = express();
		this.port = port;

		this.#initialiseMiddleware();
		this.#initialiseControllers(controllers);
		this.#initialiseErrorHandling();
	}

	#initialiseMiddleware = (): void => {
		this.express.use(helmet());
		this.express.use(
			cors({
				credentials: true,
				origin: 'http://localhost:3001',
				methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
				preflightContinue: false,
				optionsSuccessStatus: 204,
			}),
		);
		this.express.use(morgan('dev'));
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(compression());
	};

	#initialiseControllers = (controllers: IController[]): void => {
		controllers.map((controller) => {
			this.express.use('/api', cors(), controller.router);
		});
	};

	#initialiseErrorHandling = (): void => {
		this.express.use(errorHandler);
	};

	public listen = (): void => {
		this.express.listen(this.port, () => {
			const logger = Logger.getInstance();
			logger.info(`App listening on the port ${this.port}`);
		});
	};
}

export default App;
