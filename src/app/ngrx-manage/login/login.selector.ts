import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InitialLoginState } from "./login";

export const LOGIN_STATE_NAME = 'login';

export const getLoginState = createFeatureSelector<InitialLoginState>(LOGIN_STATE_NAME);

export const getLoginStateData = createSelector(
  getLoginState,
  (state: InitialLoginState) => state
);