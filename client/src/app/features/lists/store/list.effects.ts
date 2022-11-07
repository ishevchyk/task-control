import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, switchMap} from "rxjs";
import {List} from "../../../shared/models/list.model";
import * as ListActions from './list.actions'
import {Task} from "../../../shared/models/task.model";

@Injectable()
export class ListEffects {
  token: string;

  fetchLists = createEffect(() => this.actions$.pipe(
    ofType(ListActions.FETCH_LISTS),
    switchMap((action: ListActions.FetchLists) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.get<List[]>(
        `http://localhost:8080/api/lists/${action.payload}`,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.token}`
          })
        }
      )
    }),
    map((lists: List[])=> {
      return new ListActions.SetLists(lists)
    })
  ))

  addList = createEffect(() => this.actions$.pipe(
    ofType(ListActions.START_ADDING_LIST),
    switchMap((actionData: ListActions.StartAddingList) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.post<List>(`http://localhost:8080/api/lists/${actionData.payload.boardId}`, actionData.payload.list, {
        headers: new HttpHeaders({'authorization': `Bearer ${this.token}`})
      } )
    }),
    map((list: List) => {
      return new ListActions.AddList(list)
    })
  ))

  addTask = createEffect(() => this.actions$.pipe(
    ofType(ListActions.START_ADDING_TASK),
    switchMap((actionData: ListActions.StartAddingTask) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.post<Task>(`http://localhost:8080/api/tasks/${actionData.payload.listId}`, actionData.payload.task, {
        headers: new HttpHeaders({'authorization': `Bearer ${this.token}`})
      } )
    }),
    map((task: Task) => {
      return new ListActions.AddTask(task)
    })

  ))

  editList = createEffect(() => this.actions$.pipe(
    ofType(ListActions.EDIT_LIST),
    switchMap((action: ListActions.EditList) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.put<List>(`http://localhost:8080/api/lists/${action.payload.id}`, action.payload.list, {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.token}`
        })
      })
    })
  ), {dispatch: false})

  deleteList = createEffect(() => this.actions$.pipe(
    ofType(ListActions.DELETE_LIST),
    switchMap((action: ListActions.DeleteList) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.delete(`http://localhost:8080/api/lists/${action.payload}`, {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.token}`
        })
      })
    })
  ), {dispatch: false})

  deleteTask = createEffect(() => this.actions$.pipe(
    ofType(ListActions.DELETE_TASK),
    switchMap((action: ListActions.DeleteTask) => {
      this.token = JSON.parse(localStorage.getItem('userData')).token;
      return this.http.delete(`http://localhost:8080/api/tasks/${action.payload.taskId}`, {
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
