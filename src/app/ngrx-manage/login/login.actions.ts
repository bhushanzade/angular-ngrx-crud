import { Action, createAction, props } from "@ngrx/store";
import { ILogin } from "./login";

export const LoginActionStart = createAction(
  '[LOGIN ACCOUNT] Login Action Start', props<ILogin>());

export const LoginActionSuccess = createAction(
  '[LOGIN ACCOUNT] Login Success', props<{ data: any }>());

export enum UserActionTypes {
  LOGIN = '[User] LOGIN',
  LOGIN_COMPLETE = '[User] LOGIN_COMPLETE',
}
export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: ILogin) { }
}

export class LoginComplete implements Action {
  readonly type = UserActionTypes.LOGIN_COMPLETE;
  constructor(public payload: any) { }
}

export type UserActions
  = Login
  | LoginComplete;