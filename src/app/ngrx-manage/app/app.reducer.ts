// import { UserActionTypes, UserActions } from "./login.actions";
// import { IUser } from './login';

import { createReducer } from "@ngrx/store";
import { AppActionTypes, AppActions } from "./app.action";
import { ApplicationState, initialAppState } from "./app.state";

export function AppReducerSwitch(state: ApplicationState = initialAppState, action: AppActions): any {
  switch (action.type) {

    case AppActionTypes.HTTP_ERROR:
      return {
        ...state,
        Error: action.payload
      };
    case AppActionTypes.USER_DATA:
      return {
        ...state,
        LoginUser: action.payload
      }

    default:
      return state;
  }
}

// const _appReducer = createReducer(initialAppState);

// export function AppReducer(state: any, action: any) {
//   return _appReducer(state, action);
// }