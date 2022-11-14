import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs";
import { Board } from "../../../shared/models/board.model";
import * as Workspace from "./workspace.actions";


@Injectable()
export class WorkspaceEffects {
  fetchBoards = createEffect(() => this.actions$.pipe(
    ofType(Workspace.FETCH_BOARDS),
    switchMap(() => {
      return this.http.get<Board[]>('http://localhost:8080/api/boards')
    }),
    map(boards => {
      return boards.map(board => {
        return {
          ...board,
          lists: board.lists ? board.lists : [],
        }
      })
    }),
    map(boards => {
      return new  Workspace.SetBoards(boards)
    })
  ))

  addBoard = createEffect(() => this.actions$.pipe(
    ofType(Workspace.START_ADDING_BOARD),
    switchMap((actionData: Workspace.AddBoard)  => {
      return this.http.post<Board>(
        'http://localhost:8080/api/boards',
        actionData.payload,
      )
    }),
    map((board: Board) => {
      return new Workspace.AddBoard(board)
    })
  ))

  editBoard = createEffect(() => this.actions$.pipe(
    ofType(Workspace.EDIT_BOARD),
    switchMap((action: Workspace.EditBoard) => {
      return this.http.put<Board>(
        `http://localhost:8080/api/boards/${action.payload.id}`,
        action.payload.updatedBoard
      )
    }),
    map((board) => {
      return new Workspace.FetchBoards()
    })
  ))

  deleteBoard = createEffect(() => this.actions$.pipe(
    ofType(Workspace.DELETE_BOARD),
    switchMap((action: Workspace.DeleteBoard) => {
      return this.http.delete(`http://localhost:8080/api/boards/${action.payload}`)
    })
  ), {dispatch: false})


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    ) {}
}
