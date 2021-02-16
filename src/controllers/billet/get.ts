import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { validateBillet } from '../../../src/utils/validate-billet';
import BadRequest from '../../../src/errors/bad-request';
import requestMiddleware from '../../middleware/request-middleware';
import { Billet } from '../../models/Billet';

export const getBilletSchema = Joi.object().keys({
  id: Joi.string()
    .length(47)
    .message('Linha digitável tem que conter 47 caracteres')
});

const get: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const billetNumber = validateBillet(id);

    const billet = await Billet.findOne({ barCode: billetNumber });

    if (!billet) {
      throw new BadRequest('Boleto não encontrado');
    }

    res.json({ billet });
  } catch (error) {
    res.json(error);
  }
};

export default requestMiddleware(get, {
  validation: { params: getBilletSchema }
});
