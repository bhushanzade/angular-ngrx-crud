import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LogoutState } from "./logout.state";

export const LOGOUT_STATE_NAME = 'logout';

export const getLogoutState = createFeatureSelector<LogoutState>(LOGOUT_STATE_NAME);

export const getLogoutStateData = createSelector(
  getLogoutState,
  (state: LogoutState) => state
);