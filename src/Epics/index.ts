import { SliderPhotosEpic } from './SliderPhotosEpic';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(
  SliderPhotosEpic
);