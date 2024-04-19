import { middlewareAuth } from './middlewareAuth';
import { middlewareTags } from './middlewareTags';
import { middlewareToast } from './middlewareToast';

export const middlewares = [middlewareToast, middlewareTags, middlewareAuth];
