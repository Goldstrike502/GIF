import { Photo } from '../Types';
import { receivedSliderPhotos } from '../Actions';
import { mapTo } from 'rxjs/operator/mapTo';
import { switchMap, map } from 'rxjs/operators';
import { GET_WEBSITE_CONTENT } from '../Constants';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { ContentfulClient as client, SLIDER_PHOTO_CONTENT_TYPE_ID } from '../Contentful';

export const contentEpic = (actions$: ActionsObservable<Action>) => {
  return actions$
    .ofType(GET_WEBSITE_CONTENT)
    .pipe(
      switchMap(action => client.getEntries()),
      map(entries => {
        const actions = [];
        const photos: Photo[] = entries.items
          .filter(item => item.sys.contentType.sys.id === SLIDER_PHOTO_CONTENT_TYPE_ID).map(entry => {
              return {
                original: entry.fields.image.fields.file.url,
                thumbnail: entry.fields.image.fields.file.url
            };
          });
          actions.push(receivedSliderPhotos(photos))
          return actions;
        })
    );
};