import { Action } from "@ngrx/store";
import {List} from "../../../shared/models/list.model";
import {Task} from '../../../shared/models/task.model'

export const FETCH_LISTS = '[List] FETCH_LISTS';
export const SET_LISTS = '[List] SET_LISTS';
export const CLEAR_LISTS = '[List] CLEAR_LISTS';
export const START_ADDING_LIST = '[List] Start Adding List';
export const ADD_LIST = '[List] Add List';
export const EDIT_LIST = '[List] Edit List';
export const DELETE_LIST = '[List] Delete List';
export const START_ADDING_TASK = '[List] Start Adding Task';
export const ADD_TASK = '[List] Add Task';
export const EDIT_TASK = '[List] Edit Task';
export const DELETE_TASK = '[List] Delete Task';

export const SET_ACTIVE_COMMENTS = '[List] Set Active Comments';
export const CLEAR_ACTIVE_COMMENTS = '[List] Clear Active Comments';
export const ADD_COMMENT = '[List] Add Comment';
export const DELETE_COMMENT = '[List] Delete Comment';


export class SetActiveComments implements Action {
  readonly type = SET_ACTIVE_COMMENTS;
  constructor(public payload: string[]) {}
}
export class ClearActiveComments implements Action {
  readonly type = CLEAR_ACTIVE_COMMENTS;
}
export class AddComment implements Action {
  readonly type = ADD_COMMENT;
  constructor(public payload: {taskId: string, comment: { comment: string }}) {}
}
export class DeleteComment implements Action {
  readonly type = DELETE_COMMENT;
  constructor(public payload: {taskId: string, index: number}) {}
}

export class FetchLists implements Action {
  readonly type = FETCH_LISTS;
  constructor(public payload: string) {}
}
export class SetLists implements Action {
  readonly type = SET_LISTS;
  constructor(public payload: List[]) {
  }
}

export class ClearLists implements Action {
  readonly type = CLEAR_LISTS;
}

export class StartAddingList implements Action{
  readonly type = START_ADDING_LIST;
  constructor(public payload:
                {
                  boardId: string, list: List
                }) {}
}

export class AddList implements Action{
  readonly type = ADD_LIST;
  constructor(public payload: List) {}
}

// export class EditList implements Action{
//   readonly type = EDIT_LIST;
//   constructor(
//     public payload: {id: string, list: List}
//   ) {}
// }

export class EditList implements Action{
  readonly type = EDIT_LIST;
  constructor(
    public payload: {id: string, dataToUp: {}}
  ) {}
}

export class DeleteList implements Action {
  readonly type = DELETE_LIST;
  constructor(public payload: string) {}
}

export class StartAddingTask implements Action{
  readonly type = START_ADDING_TASK;
  constructor(public payload:
                {
                  listId: string, task: Task
                }) {}
}

export class AddTask implements Action{
  readonly type = ADD_TASK;
  constructor(public payload: Task) {}
}

export class EditTask implements Action{
  readonly type = EDIT_TASK;
  constructor(
    public payload: {task: Task, dataToUp: {}}
  ) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;
  constructor(public payload: {
    listId: string,
    taskId: string
  }) {
  }

}



export type ListActions =
  | FetchLists
  | SetLists
  | ClearLists
  | StartAddingList
  | AddList
  | EditList
  | DeleteList
  | AddTask
  | EditTask
  | DeleteTask
  | SetActiveComments
  | ClearActiveComments
  | AddComment
  | DeleteComment
