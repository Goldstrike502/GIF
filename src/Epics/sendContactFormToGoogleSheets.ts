import { setContactSucceeded } from '../Actions';
import { map, switchMap } from 'rxjs/operators';
import { SEND_FORM_TO_GOOGLE_SHEETS } from '../Constants';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { googleSheetsURL } from '../Constants/api';

export const sendContactFormToGoogleSheets = (actions$: ActionsObservable<Action>) => {
  return actions$.ofType(SEND_FORM_TO_GOOGLE_SHEETS)
    .pipe(
      switchMap((action: { type: string, formData: any }) => {
        const form = action.formData;

        const data = new FormData();
        Object.keys(form).forEach(key => data.append(key, form[key]));
        return Observable.fromPromise(fetch(googleSheetsURL, {
          method: 'POST',
          body: data
        }));
      }),
      map(_ => setContactSucceeded())
    );
};