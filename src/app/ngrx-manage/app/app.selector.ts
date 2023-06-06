import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApplicationState } from "./app.state";

export const getAppState = createFeatureSelector<ApplicationState>('app');

export const getHttpError = createSelector(
  getAppState,
  (state: ApplicationState) => state?.Error
);

export const getUserData = createSelector(
  getAppState,
  (state: ApplicationState) => state?.LoginUser
);