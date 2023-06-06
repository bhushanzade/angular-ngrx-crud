import { Action } from "@ngrx/store";

export enum AppActionTypes {
  HTTP_ERROR = '[HTTP] HTTP_ERROR',
  USER_DATA = '[USER] USER_DATA',
}

export class UserDataAction implements Action {
  readonly type = AppActionTypes.USER_DATA;
  constructor(public payload: any) { }
}

export class HttpErrorHandle implements Action {
  readonly type = AppActionTypes.HTTP_ERROR;
  constructor(public payload: any) { }
}

export type AppActions
  = HttpErrorHandle | UserDataAction