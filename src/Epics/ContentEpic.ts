import { getWebsiteContent } from '../Actions';
import { startWith } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';
import { GET_WEBSITE_CONTENT } from '../Constants';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { ContentfulClient as client } from '../Contentful';
import { receivedWebsiteEntries } from '../Actions/index';

export const contentEpic = (actions$: ActionsObservable<Action>) => {
  return actions$
    .ofType(GET_WEBSITE_CONTENT)
    .pipe(startWith(getWebsiteContent()))
    .pipe(
      switchMap(action => client.getEntries()),
      map((entries) => receivedWebsiteEntries(entries)), 
    );
};
