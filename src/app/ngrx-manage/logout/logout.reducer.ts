import { LogoutActionTypes, LogoutActions } from "./logout.actions";
import { LogoutState, initLogoutState } from "./logout.state";

export function LogoutReducer(state: LogoutState = initLogoutState, action: LogoutActions): LogoutState {
  switch (action.type) {
    case LogoutActionTypes.LOGOUT_APP:
      return {
        ...state,
        is_logout: true,
        is_login_redirect: action.isLoginRedirect
      };

    default:
      return state;
  }
}