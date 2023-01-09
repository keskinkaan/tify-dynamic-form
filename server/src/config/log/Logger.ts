import { format, createLogger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, printf, prettyPrint, errors } = format;

export default class Logger {
	public static getInstance = (service = 'App-Service', path = 'app') => {
		const logger = createLogger({
			defaultMeta: { service },
			format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' })),
			// transports: [
			// 	//new transports.Console(),
			// 	//Logger.getHttpLoggerTransport(path),
			// 	Logger.getInfoLoggerTransport(path),
			// 	Logger.getErrorLoggerTransport(path),
			// ],
		});

		if (process.env.NODE_ENV !== 'production') {
			logger.add(Logger.getConsoleLoggerTransport()).add(Logger.getErrorLoggerTransport(path));
		} else {
			logger
				.add(Logger.getConsoleLoggerTransport())
				.add(Logger.getErrorLoggerTransport(path))
				.add(Logger.getInfoLoggerTransport(path));
		}
		return logger;
	};

	private static errorFilter = format((info) => {
		return info.level === 'error' ? info : false;
	});

	private static infoFilter = format((info) => {
		return info.level === 'info' ? info : false;
	});

	private static httpFilter = format((info) => {
		return info.level === 'http' ? info : false;
	});

	static getConsoleLoggerTransport = () => {
		return new transports.Console({
			format: format.combine(
				timestamp({ format: 'HH:mm:ss' }),
				errors({ stack: true }),
				printf((info) => {
					const ni = info.level.toUpperCase();
					if (info.level === 'error') {
						return `[\u001b[31m${ni}\u001b[0m] \u001b[30;5;1m${info.timestamp} ${info.service}\u001b[0m ${
							info.stack || info.message
						}`;
					} else {
						return `[\u001b[36m${ni}\u001b[0m] \u001b[30;5;1m${info.timestamp} ${info.service}:\u001b[0m ${info.message}`;
					}
				}),
			),
		});
	};

	static getInfoLoggerTransport = (path: string) => {
		return new DailyRotateFile({
			filename: 'logs/' + path + '/info-%DATE%.log',
			datePattern: 'HH-DD-MM-YYYY',
			zippedArchive: true,
			maxSize: '10m',
			maxFiles: '14d',
			level: 'info',
			format: format.combine(Logger.infoFilter(), format.timestamp(), json(), prettyPrint()),
		});
	};

	static getErrorLoggerTransport = (path: string) => {
		return new DailyRotateFile({
			filename: 'logs/' + path + '/error-%DATE%.log',
			datePattern: 'HH-DD-MM-YYYY',
			zippedArchive: true,
			maxSize: '10m',
			maxFiles: '14d',
			level: 'error',
			format: format.combine(Logger.errorFilter(), format.timestamp(), json(), prettyPrint()),
		});
	};

	static getHttpLoggerTransport = (path: string) => {
		return new DailyRotateFile({
			filename: 'logs/' + path + '/http-%DATE%.log',
			datePattern: 'HH-DD-MM-YYYY',
			zippedArchive: true,
			maxSize: '10m',
			maxFiles: '14d',
			level: 'http',
			format: format.combine(Logger.httpFilter(), format.timestamp(), json(), prettyPrint()),
		});
	};
}
