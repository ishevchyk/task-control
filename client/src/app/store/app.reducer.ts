import * as fromAuth from '../auth/store/auth.reducer';
import * as fromWorkspace from '../features/workspace/store/workspace.reducer';
import * as fromList from '../features/lists/store/list.reducer';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: fromAuth.State;
  workspace: fromWorkspace.State;
  list: fromList.State;

}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  workspace: fromWorkspace.workspaceReducer,
  list: fromList.listReducer
}
