import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {Store} from "@ngrx/store";
import { Subscription, map } from 'rxjs';
import { List } from 'src/app/shared/models/list.model';


import * as fromApp from '../../store/app.reducer';
import * as ListActions from './store/list.actions';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[]
  addListForm: FormGroup;
  showForm = false;
  boardId: string;
  listsSub: Subscription;
  boardsSub: Subscription;

  @Input() filterValue: string = '';
  @Input() sortValue: string = '';
  @Input() sortOrder: string = '';

  ngOnInit(): void {
    this.listsSub = this.store.select('list').pipe(
      map(listsState => {
        return listsState.lists
      }),
    )
      .subscribe( lists => {
          this.lists = [...lists];
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

  drop(event: CdkDragDrop<List[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  initNewListForm(){
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

  constructor(
    private store: Store<fromApp.AppState>
  ) { }
}
