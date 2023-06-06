import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserProfileCompleteAction, UserProfileActionTypes } from "./profile.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HttpErrorHandle } from "../app/app.action";


@Injectable()
export class UserProfileEffect {

  constructor(
    private action$: Actions,
    private http: HttpClient,
  ) {
  }

  userProfile$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserProfileActionTypes.USER_PROFILE_FETCH),
      exhaustMap(() => {
        const url = environment.base_url + 'user/profile';
        return this.http.get<any>(url).pipe(map(data => {
          localStorage.setItem('userdata', JSON.stringify(data.data));
          return new UserProfileCompleteAction(data.data);
        }))
      })
    )
  })

}