import {Action} from "@ngrx/store";

export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {firstname: string, lastname: string, username: string,email: string; password: string}) {}
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(
    public payload: { message: string }
  ) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(
    public payload: { email: string; password: string }
  ) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(
    public payload: {
      email: string;
      firstname: string;
      lastname: string;
      username: string;
      id: string;
      token: string;
      redirect?: boolean;
    }
  ) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions = LoginStart | SignupStart | SignupSuccess | LoginSuccess | LoginFail | ClearError | AutoLogin | Logout
