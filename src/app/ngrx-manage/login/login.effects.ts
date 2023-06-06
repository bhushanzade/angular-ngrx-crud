import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginComplete, UserActionTypes } from "./login.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpErrorHandle, UserDataAction } from "../app/app.action";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";


@Injectable()
export class LoginEffect {

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store,
  ) {
  }

  checkAuth$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActionTypes.LOGIN),
      // ofType(LoginActionStart),
      exhaustMap((action: any) => {
        const url = environment.base_url + 'user/login';
        return this.http.post<any>(url, action.payload).pipe(map(data => {
          this.store.dispatch(new UserDataAction(data.data));
          localStorage.setItem('userdata', JSON.stringify(data.data));
          return new LoginComplete(data.data);
        }))
      })
    )
  })

}