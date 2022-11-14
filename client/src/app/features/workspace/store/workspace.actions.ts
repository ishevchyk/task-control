import { Action } from "@ngrx/store";
import {Board} from "../../../shared/models/board.model";

export const FETCH_BOARDS = '[Workspace] Fetch Boards';
export const SET_BOARDS = '[Workspace] Set Boards';
export const START_ADDING_BOARD = '[Workspace] Start Adding Board';
export const ADD_BOARD = '[Workspace] Add Board';
export const EDIT_BOARD = '[Workspace] Edit Board';
export const DELETE_BOARD = '[Workspace] Delete Board';
export const SET_ACTIVE_BOARD = '[Workspace] Set Active Board';
export const CLEAR_ACTIVE_BOARD = '[Workspace] Clear Active Board';

export class FetchBoards implements Action{
  readonly type = FETCH_BOARDS;
}
export class SetBoards implements Action{
  readonly type = SET_BOARDS;
  constructor(public payload: Board[]) {}
}

export class StartAddingBoard implements Action{
  readonly type = START_ADDING_BOARD;
  constructor(public payload: {
    name: string,
    description: string
  }) {}
}
export class AddBoard implements Action{
  readonly type = ADD_BOARD;
  constructor(public payload: Board) {}
}

export class EditBoard implements Action {
  readonly type = EDIT_BOARD;
  constructor(public payload: {id: string, updatedBoard: Board}) {}
}
export class DeleteBoard implements Action{
  readonly type = DELETE_BOARD;
  constructor(public payload: string) {}
}

export class SetActiveBoard implements Action {
  readonly  type = SET_ACTIVE_BOARD;
  constructor(public payload: Board) {}
}
export class ClearActiveBoard implements Action {
  readonly  type = CLEAR_ACTIVE_BOARD;
}


export type WorkspaceActions =
  | FetchBoards
  | SetBoards
  | StartAddingBoard
  | AddBoard
  | EditBoard
  | DeleteBoard
  | SetActiveBoard
  | ClearActiveBoard
