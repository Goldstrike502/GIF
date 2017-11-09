import { Sitemap } from '../Types';
import { receivedFooterSitemap } from '../Actions';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map, take } from 'rxjs/operators';
import { GET_FOOTER_SITEMAP } from '../Constants';
import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { ContentfulClient as client } from '../Contentful';

export const FooterEpic = (actions$: ActionsObservable<Action>) => {
  return actions$
    .pipe(
        map((allEntries) => {
            console.log('footer data', allEntries);
            const sitemap: Sitemap = {items: []};
            return receivedFooterSitemap(sitemap);
        }, 
      )
      );
};