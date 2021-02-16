import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';

const get: RequestHandler = async (req, res) => {
  res.json({ message: 'API Working fine', status: 200 });
};

export default requestMiddleware(get);
