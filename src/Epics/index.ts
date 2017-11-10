import { contentEpic } from './ContentEpic';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(
  contentEpic
);