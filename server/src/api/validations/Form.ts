import Joi from 'joi';

const create = Joi.object({
	name: Joi.string().min(3).max(16),
	surname: Joi.string().min(3).max(16),
	dateOfBirth: Joi.string().min(3).max(16),
	age: Joi.string(),
	country: Joi.string().min(3).max(16),
	martialStatus: Joi.string().min(3).max(16),
	hobbies: Joi.array().items(Joi.string()),
	profilePicture: Joi.string(),
});

export default { create };
