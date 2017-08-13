import { Router, Response, Request } from 'express';
import { logger } from './logger';

import * as defaultController from './controllers/default.controller';

const applicationRoutes: Router = Router();


/////////////// MIDDLEWARE ///////////////////////////////////

applicationRoutes.use(function (req, res, next) {
  logger.info(req.method,req.originalUrl);
  next();
});

/////////////// ROUTES ///////////////////////////////////

applicationRoutes.get('/foo', defaultController.foo);

export { applicationRoutes };
