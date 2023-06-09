import { ActionReducerMap } from "@ngrx/store";
import { LoginReducerSwitch } from "../login/login.reducer";
import { LOGIN_STATE_NAME } from "../login/login.selector";
import { AppReducerSwitch } from "./app.reducer";
import { LOGOUT_STATE_NAME } from "../logout/logout.selector";
import { LogoutReducer } from "../logout/logout.reducer";
import { USER_PROFILE_STATE_NAME } from "../profile/profile.selector";
import { UserProfileReducer } from "../profile/profile.reducer";
import { BLOG_STATE_NAME } from "../blogs/blogs.selector";
import { BlogReducer } from "../blogs/blogs.reducer";
import { routerReducer } from "@ngrx/router-store";
import { BlogEntityReducer } from "../blog_entity/blogs.reducer";
import { BLOG_ENTITY_STATE_NAME } from "../blog_entity/blogs.selector";

export interface IAuthUser {
  name: string;
  email: string;
  createdBy: string;
  loggedInAt: string;
  organization: string;
  role: string;
  token: string;
  username: string;
}

export class AuthUser {
  name: string = '';
  email: string = '';
  createdBy: string = '';
  loggedInAt: string = '';
  organization: string = '';
  role: string = '';
  token: string = '';
  username: string = '';
}

export interface ApplicationState {
  LoginUser: IAuthUser,
  Error: any,
}

export const initialAppState: ApplicationState = {
  LoginUser: new AuthUser(),
  Error: null,
};

export const AppReducer: ActionReducerMap<any, any> = {
  app: AppReducerSwitch,
  [LOGIN_STATE_NAME]: LoginReducerSwitch,
  [LOGOUT_STATE_NAME]: LogoutReducer,
  [USER_PROFILE_STATE_NAME]: UserProfileReducer,
  [BLOG_STATE_NAME]: BlogReducer,
  [BLOG_ENTITY_STATE_NAME]: BlogEntityReducer,
  router: routerReducer,
};