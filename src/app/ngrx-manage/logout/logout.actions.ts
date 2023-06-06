import { Action } from "@ngrx/store";

export enum LogoutActionTypes {
  LOGOUT_APP = '[LOGOUT] LOGOUT_APP',
}

export class LogoutInilizeAction implements Action {
  readonly type = LogoutActionTypes.LOGOUT_APP;
  constructor(public isLoginRedirect: boolean) { }
}

export type LogoutActions = LogoutInilizeAction