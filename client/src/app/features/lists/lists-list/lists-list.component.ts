import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import * as ListActions from '../store/list.actions';
import {Store} from "@ngrx/store";
import {List} from "../../../shared/models/list.model";
import {map, Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {
  lists: List[]

  addListForm: FormGroup;
  showForm = false;
  boardId: string;
  listsSub: Subscription;
  boardsSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.listsSub = this.store.select('list').pipe(
      map(listsState => {
        return listsState.lists
      }),
      )
      .subscribe( lists => {
          this.lists = lists;
        }
      )
    this.boardsSub = this.store.select('workspace').pipe(
      map(wsState => {
        return wsState.activeBoard
      })
    ).subscribe( board => {
      this.boardId = board._id
    }
    )
  }

  initForm(){
    this.showForm = true;
    this.addListForm = new FormGroup({
      'name': new FormControl(null)
    })
  }

  onSubmit(){
    this.showForm = false;
    this.store.dispatch(new ListActions.StartAddingList({
      boardId: this.boardId,
      list: this.addListForm.value
    }))
  }
  hideForm(){
    this.showForm = false;
  }

}
