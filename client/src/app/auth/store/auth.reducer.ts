import {User} from '../User.model';
import * as AuthActions from './auth.actions'

export interface State {
  user: User;
  authError: string
}

const initialState: State = {
  user: null,
  authError: null
}

export function authReducer (
  state = initialState,
  action: AuthActions.AuthActions
){
  switch (action.type){
    case AuthActions.LOGIN_SUCCESS:
      console.log('User login suc ', state.user)
      const user = new User(
        action.payload.id,
        action.payload.email,
        action.payload.username,
        action.payload.firstname,
        action.payload.lastname,
        action.payload.token,
      )
      return {
        ...state,
        user: user
      }
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    case AuthActions.LOGOUT:
      console.log('User log out ', state.user)
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
