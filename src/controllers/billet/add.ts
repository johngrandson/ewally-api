import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import { Billet } from '../../models/Billet';

export const addBilletSchema = Joi.object().keys({
  barCode: Joi.string().required(),
  amount: Joi.string().required(),
  expirationDate: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { barCode, amount, expirationDate } = req.body;

  const billet = new Billet({ barCode, amount, expirationDate });
  await billet.save();

  res.send({
    message: 'Saved',
    billet: billet.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addBilletSchema } });
