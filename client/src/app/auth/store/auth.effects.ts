import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import * as AuthActions from './auth.actions'
import {switchMap, of, map, catchError, tap} from "rxjs";
import { User } from "../User.model";

export interface authResData {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  _id: string;
  jwt_token: string;
}


const handleAuthentication = (
  email: string,
  firstname: string,
  lastname: string,
  username: string,
  id: string,
  token: string ) => {
  const user = new User(id, email, username, firstname, lastname, token);
  localStorage.setItem('userData', JSON.stringify(user))
  return new AuthActions.LoginSuccess({
    email: email,
    firstname: firstname,
    lastname: lastname,
    username: username,
    id: id,
    token: token,
    redirect: true
  });
}
const handleError = (errorRes: any) => {
  if(!errorRes.error && !errorRes.error.error){
    return of(new AuthActions.LoginFail('An unknown error.js occurred!'));
  } else {
    let errMsg = '';
    (typeof errorRes.error === 'string') ? errMsg = errorRes.error : errMsg = errorRes.error.error
    return of(new AuthActions.LoginFail(errMsg));
  }

}


@Injectable()
export class AuthEffects {
  authLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<authResData>(
          'http://localhost:8080/api/auth/login',
          {
            email: authData.payload.email,
            password: authData.payload.password,
          }
        )
        .pipe(
          map(resData => {
            console.log(resData)
            return handleAuthentication(resData.email, resData.firstname, resData.lastname, resData.username, resData._id, resData.jwt_token)
          }),
          catchError(errRes => {
            console.log(errRes)
            return handleError(errRes)
          })
        );
    })
  ))
  authSignup = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<{message: string}>(
          'http://localhost:8080/api/auth/register',
          {
            firstname: authData.payload.firstname,
            lastname: authData.payload.lastname,
            username: authData.payload.username,
            email: authData.payload.email,
            password: authData.payload.password,
          }
        )
        .pipe(
          map(resData => {
            console.log(resData)
            return new AuthActions.SignupSuccess(resData)
          }),
          catchError(errRes => {
            console.log(errRes)
            return handleError(errRes)
          })
        )
    })
  ))

  autoLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        id: string; email: string; username: string; firstname: string;
        lastname: string; token: string; } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {
          type: 'DUMMY'
        }
      }
      const loadedUser = new User(
        userData.id,
        userData.email,
        userData.username,
        userData.firstname,
        userData.lastname,
        userData.token,
      );
      console.log('load user ', loadedUser)

      if (loadedUser.token) {

        return new AuthActions.LoginSuccess({
          email: loadedUser.email,
          firstname: loadedUser.firstname,
          lastname: loadedUser.lastname,
          username: loadedUser.username,
          id: loadedUser.id,
          token: loadedUser.token,
          redirect: false
        });
      }
      return {
        type: 'DUMMY'
      }
    })
  ))

  authLogout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  ), {dispatch: false});

  signupRedirect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SIGNUP_SUCCESS),
    tap(() => {
      this.router.navigate(['auth/login']);
    })
  ), {dispatch: false});

  loginRedirect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap((actionSuccess: AuthActions.LoginSuccess) => {
      if(actionSuccess.payload.redirect ) {
        this.router.navigate(['/']);
      }
    })


  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}
}
