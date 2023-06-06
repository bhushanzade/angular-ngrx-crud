import { Action } from "@ngrx/store";
import { IUserProfile } from "./profile.state";

export enum UserProfileActionTypes {
  USER_PROFILE_FETCH = '[USER_PROFILE] USER_PROFILE_FETCH',
  USER_PROFILE_COMPLETE = '[USER_PROFILE] USER_PROFILE_COMPLETE',
}

export class UserProfileFetchAction implements Action {
  readonly type = UserProfileActionTypes.USER_PROFILE_FETCH;
}

export class UserProfileCompleteAction implements Action {
  readonly type = UserProfileActionTypes.USER_PROFILE_COMPLETE;
  constructor(public payload: IUserProfile) { }
}

export type UserProfileActions = UserProfileFetchAction | UserProfileCompleteAction;