import { contentEpic } from './ContentEpic';
import { combineEpics } from 'redux-observable';
import { sendContactFormToGoogleSheets } from './sendContactFormToGoogleSheets';

export const rootEpic = combineEpics(
  contentEpic,
  sendContactFormToGoogleSheets
);