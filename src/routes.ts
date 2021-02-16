import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BookController from './controllers/billet';
import * as HealthController from './controllers/health';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Healthcheck
router.get('/health', HealthController.get);

// Billet routes
router.get('/boleto/:id(\\d+)', BookController.get);
router.post('/boleto', BookController.add);

// Docs routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

export default router;
