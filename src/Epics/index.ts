import { SliderPhotosEpic } from './SliderPhotosEpic';
import { combineEpics } from 'redux-observable';
import { FooterEpic } from './FooterEpic';

export const rootEpic = combineEpics(
  SliderPhotosEpic,
  FooterEpic
);