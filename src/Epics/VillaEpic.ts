import { Entry } from 'contentful';
import { VillaFaciliteiten } from '../Pages/Villa/Villa';
import { map, switchMap } from 'rxjs/operators';
import { Action } from 'redux';
import { GET_CHATEAU_POSTS } from '../Constants';
import { ActionsObservable } from 'redux-observable';
import { ContentfulClient as client, VILLAS_CONTENT_TYPE_ID } from '../Contentful';

export const VillaEpic = (actions$: ActionsObservable<Action>) => {
  return actions$.ofType(GET_CHATEAU_POSTS).pipe(
    switchMap((action) => client.getEntries({
    content_type: VILLAS_CONTENT_TYPE_ID,
    select: ['fields.faciliteiten,fields.title,fields.prijsVanaf,fields.slug']
  })),
    map(entries => entries.items.map((villa: Entry<VillaFaciliteiten>) => {
    return {
      ...villa.fields
    };
  }))
);  
};