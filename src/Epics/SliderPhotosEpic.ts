import { SliderPhotoContentModel } from '../Types';
import { EntryCollection } from 'contentful';
import { SLIDER_PHOTO_CONTENT_TYPE_ID } from '../Contentful';
import { ReceivedSliderPhotos } from '../Actions';
import { Action } from 'redux';
import { flatMap, map } from 'rxjs/operators';
import { GET_SLIDER_PHOTOS } from '../Constants/index';
import { ContentfulClient as client } from '../Contentful';
import { GetSliderPhotos } from '../Actions/index';
import { ActionsObservable, Epic, ofType } from 'redux-observable';

export const SliderPhotosEpic: Epic<Action, {}, any> = 
    (actions$: ActionsObservable<GetSliderPhotos>) => {
        return actions$.pipe(
            ofType(GET_SLIDER_PHOTOS),
            flatMap((action: GetSliderPhotos) => {
            return client.getEntries({
                content_type: SLIDER_PHOTO_CONTENT_TYPE_ID,
                'fields.homepage': true
              })
                .then((content: EntryCollection<SliderPhotoContentModel>) => content.items.map(photo => {
                  return {
                    original: photo.fields.image.fields.file.url,
                    thumbnail: photo.fields.image.fields.file.url
                  };
                }));
            }),
            map((photos) => {                
                return ReceivedSliderPhotos(photos);
            })
    );
};