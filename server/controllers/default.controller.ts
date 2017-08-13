import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { error, log, sendJson } from './response-handler';
import { logger } from '../logger';


export async function foo(req: Request, res: Response) {
  sendJson(res, {test: 'OK'}, 200);
}