import * as express from 'express';
import * as path from 'path';
import { json, urlencoded } from 'body-parser';
import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { logger } from './logger';
import { setEnv } from './config';

import { applicationRoutes } from './routes';

const app: express.Application = express();

// app.set('env', 'production');
app.use(json({limit: '20mb'}));
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client')));

app.disable('x-powered-by');

app.use('/api', applicationRoutes);

// redirect unmatched
logger.info('ENV', app.get('env'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response | any, next: NextFunction) => {
  logger.error('Routing Error', req.originalUrl);
  const err: any = new Error('Not Found');
  err['status'] = 404;
  res['message'] = 'Endpoint was not found';
  next(err);
});

app.use((err: any, req: Request, res: Response | any, next: NextFunction) => {
  let status = err.status || 500;
  if (status < 100 || status > 500) status = 500;
  res.status(status);
  let errorMessage = res['message'] || 'There was a server error processing your request'
  logger.error('Routing Error', {status: status, message: errorMessage, err: err, url: req.originalUrl});
  res.json({
      error: errorMessage,
      message: err.message
  });
});

export { app }
