// import { UserActionTypes, UserActions } from "./login.actions";
// import { IUser } from './login';

import { createReducer } from "@ngrx/store";
import { InitialLoginState, initialLoginState } from "./login";
import { UserActionTypes, UserActions } from "./login.actions";

// const initialState: any = {
//   loading: false,
// };

// export interface initialState {
//   user: IUser;
//   loggedIn: boolean;
//   isLoading: boolean;
//   errorMessage: string;
//   hasError: boolean;
// }

export function LoginReducerSwitch(state: InitialLoginState = initialLoginState, action: UserActions): InitialLoginState {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {
        ...state,
        is_logged_in: false,
        data: null,
      };

    case UserActionTypes.LOGIN_COMPLETE:
      return {
        ...state,
        is_logged_in: true,
        data: action.payload,
      };

    default:
      return state;
  }
}

// export const getLoggedIn = (state: initialState) => state.loggedIn;
// export const selectUser = (state: initialState) => state.user;
// export const errorMessage = (state: initialState) => state.errorMessage;
// export const hasError = (state: initialState) => state.hasError;
// export const isLoading = (state: initialState) => state.isLoading;


// const _loginReducer = createReducer(initialLoginState);

// export function LoginReducer(state: any, action: any) {
//   return _loginReducer(state, action);
// }