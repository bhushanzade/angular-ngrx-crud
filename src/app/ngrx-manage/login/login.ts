export interface ILogin {
  email: string;
  password: string;
}

export interface InitialLoginState {
  is_logged_in: boolean,
  data: any
}

export const initialLoginState: InitialLoginState = {
  is_logged_in: false,
  data: null,
}