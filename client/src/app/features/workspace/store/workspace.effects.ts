import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import * as Workspace from "./workspace.actions";
import {map, switchMap} from "rxjs";
import { Board } from "../../../shared/models/board.model";


@Injectable()
export class WorkspaceEffects {
  token: string;

  fetchBoards = createEffect(() => this.actions$.pipe(
    ofType(Workspace.FETCH_BOARDS),
    switchMap(() => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      console.log(this.token)
      return this.http.get<Board[]>(
        'http://localhost:8080/api/boards',
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.token}`
          })
        })
    }),
    map(boards => {
      console.log('boards first map ', boards)
      return boards.map(board => {
        return {
          ...board,
          lists: board.lists ? board.lists : [],
        }
      })
    }),
    map(boards => {
      console.log('boards', boards)
      return new  Workspace.SetBoards(boards)
    })


  ))

  addBoard = createEffect(() => this.actions$.pipe(
    ofType(Workspace.START_ADDING_BOARD),
    switchMap((actionData: Workspace.AddBoard)  => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.post<Board>('http://localhost:8080/api/boards', actionData.payload, {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.token}`
        })
      })
    }),
    map((board: Board) => {
      return new Workspace.AddBoard(board)
    })
  ))

  editBoard = createEffect(() => this.actions$.pipe(
    ofType(Workspace.EDIT_BOARD),
    switchMap((action: Workspace.EditBoard) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.put<Board>(`http://localhost:8080/api/boards/${action.payload.id}`, action.payload.updatedBoard, {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.token}`
        })
      })
    }),
    map((board) => {
      console.log(board)
      return new Workspace.FetchBoards()
    })
  ))

  deleteBoard = createEffect(() => this.actions$.pipe(
    ofType(Workspace.DELETE_BOARD),
    switchMap((action: Workspace.DeleteBoard) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.delete(`http://localhost:8080/api/boards/${action.payload}`, {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.token}`
        })
      })
    })
  ), {dispatch: false})


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    ) {}
}
