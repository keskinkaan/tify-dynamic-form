import config from '@/config';
import { formatDate } from './functions';

export const enum LoggerType {
	INFO = 'INFO',
	ERROR = 'ERROR',
	WARN = 'WARN',
}

class Logger {
	static #defaultNameSpace: string;

	constructor() {
		Logger.#defaultNameSpace = config.defaults.namespace;
	}

	public log = (message: unknown, type: LoggerType, namespace?: string): void => {
		if (typeof message === 'string') {
			// eslint-disable-next-line no-console
			console.log(`[${formatDate(new Date())}] [${namespace || Logger.#defaultNameSpace}] [${type}] ${message}`);
		} else {
			// eslint-disable-next-line no-console
			console.log(`[${formatDate(new Date())}] [${namespace || Logger.#defaultNameSpace}] [${type}]`, message);
		}
	};
}

export default new Logger();
