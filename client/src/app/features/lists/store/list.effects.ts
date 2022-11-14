import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs";
import {List} from "../../../shared/models/list.model";
import * as ListActions from './list.actions'
import {Task} from "../../../shared/models/task.model";

@Injectable()
export class ListEffects {

  fetchLists = createEffect(() => this.actions$.pipe(
    ofType(ListActions.FETCH_LISTS),
    switchMap((action: ListActions.FetchLists) => {
      // this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.get<List[]>(`http://localhost:8080/api/lists/${action.payload}`)
    }),
    map((lists: List[])=> {
      return new ListActions.SetLists(lists)
    })
  ))

  addComment = createEffect(() => this.actions$.pipe(
    ofType(ListActions.ADD_COMMENT),
    switchMap((actionData: ListActions.AddComment) => {
      return this.http.patch<Task>(
        `http://localhost:8080/api/tasks/${actionData.payload.taskId}/addComment`,
        actionData.payload.comment
      )
    })
  ), {dispatch: false})

  deleteComment = createEffect(() => this.actions$.pipe(
    ofType(ListActions.DELETE_COMMENT),
    switchMap((actionData: ListActions.DeleteComment) => {
      return this.http.patch<Task>(
        `http://localhost:8080/api/tasks/${actionData.payload.taskId}/deleteComment`,
        {index: actionData.payload.index}
      )
    })
  ), {dispatch: false})


  addList = createEffect(() => this.actions$.pipe(
    ofType(ListActions.START_ADDING_LIST),
    switchMap((actionData: ListActions.StartAddingList) => {
      return this.http.post<List>(
        `http://localhost:8080/api/lists/${actionData.payload.boardId}`,
        actionData.payload.list
      )
    }),
    map((list: List) => {
      return new ListActions.AddList(list)
    })
  ))

  editList = createEffect(() => this.actions$.pipe(
    ofType(ListActions.EDIT_LIST),
    switchMap((action: ListActions.EditList) => {
      console.log(action.payload.dataToUp)
      return this.http.put<List>(
        `http://localhost:8080/api/lists/${action.payload.id}`,
        action.payload.dataToUp,
      )
    })
  ), {dispatch: false})

  deleteList = createEffect(() => this.actions$.pipe(
    ofType(ListActions.DELETE_LIST),
    switchMap((action: ListActions.DeleteList) => {
      return this.http.delete(`http://localhost:8080/api/lists/${action.payload}`)
    })
  ), {dispatch: false})

  addTask = createEffect(() => this.actions$.pipe(
    ofType(ListActions.START_ADDING_TASK),
    switchMap((actionData: ListActions.StartAddingTask) => {
      return this.http.post<Task>(
        `http://localhost:8080/api/tasks/${actionData.payload.listId}`,
        actionData.payload.task
      )
    }),
    map((task: Task) => {
      return new ListActions.AddTask(task)
    })

  ))
  editTask = createEffect(() => this.actions$.pipe(
    ofType(ListActions.EDIT_TASK),
    switchMap((action: ListActions.EditTask) => {
      console.log(action.payload.dataToUp)
      return this.http.put<Task>(
        `http://localhost:8080/api/tasks/${action.payload.task._id}`,
        action.payload.dataToUp,
      )
    })
  ), {dispatch: false})

  deleteTask = createEffect(() => this.actions$.pipe(
    ofType(ListActions.DELETE_TASK),
    switchMap((action: ListActions.DeleteTask) => {
      return this.http.delete(`http://localhost:8080/api/tasks/${action.payload.taskId}`,)
    })
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
