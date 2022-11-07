import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Board } from "../../shared/models/board.model";
import {Actions, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import * as WorkspaceActions from './store/workspace.actions'

import * as fromApp from '../../store/app.reducer'
import { Observable, map, take, switchMap, of} from "rxjs";

@Injectable({providedIn: "root"})
export class BoardPageResolverService implements Resolve<Board[]> {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board[]> | Promise<Board[]> | Board[] {
    return this.store.select('workspace').pipe(
      take(1),
      map(wsState => {
        return wsState.boards;
      }),
      switchMap(boards => {
        if (boards.length === 0 ) {
          this.store.dispatch(new WorkspaceActions.FetchBoards())
          return this.actions$.pipe(
            ofType(WorkspaceActions.SET_BOARDS),
            take(1)
          );
        } else {
          return of(boards)
        }
      })
    )
  }
}
