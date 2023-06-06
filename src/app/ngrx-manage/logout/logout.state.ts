export interface LogoutState {
  is_logout: boolean,
  is_login_redirect: boolean
}

export const initLogoutState: LogoutState = {
  is_logout: false,
  is_login_redirect: false
}