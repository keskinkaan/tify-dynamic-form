import dotEnv from '@/config/env/index.js';
import App from './app.js';
import FormController from '@/controllers/Form.js';

const controllers = [new FormController()];
const app = new App(controllers, parseInt(dotEnv.port as string, 10));

app.listen();
