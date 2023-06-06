import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserProfile } from "./profile.state";

export const USER_PROFILE_STATE_NAME = 'user_profile';

export const getUserProfileState = createFeatureSelector<IUserProfile>(USER_PROFILE_STATE_NAME);

export const getUserProfileStateData = createSelector(
  getUserProfileState,
  (state: IUserProfile) => state
);