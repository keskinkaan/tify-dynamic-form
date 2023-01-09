import dotenv from 'dotenv';

const root: string = process.cwd();
dotenv.config({
	path: `${root}/.env.${process.env.NODE_ENV}`,
});

const envConfig = {
	port: process.env.PORT,
	host: process.env.HOST,
};

export default envConfig;
