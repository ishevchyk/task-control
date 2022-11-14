import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import { Board } from 'src/app/shared/models/board.model';

import * as fromApp from '../../../store/app.reducer'
import * as WorkspaceActions from '../store/workspace.actions';
import * as ListActions from '../../lists/store/list.actions';
import {List} from "../../../shared/models/list.model";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  id: string;
  board: Board;
  lists: List[];

  showForm = false;
  editBoardForm: FormGroup;


  ngOnInit() {
    this.route.params.pipe(
      map((params: Params) => {
        return params['id']
      }),
      switchMap(id => {
        this.id = id
        return this.store.select('workspace')
      }),
      map(workspaceState => {
        return workspaceState.boards.find((board) => {
          return board._id === this.id;
        })
      }),

    ).subscribe(board => {
      this.board = board;
    })
    this.store.dispatch(new ListActions.FetchLists(this.board._id))
    this.store.dispatch(new WorkspaceActions.SetActiveBoard(this.board))
  }

  ngOnDestroy() {
    this.store.dispatch(new ListActions.ClearLists());
  }

  filterValue: string = '';
  sortValue: string = '';
  sortOrder: string = '';
  @Output() changed: EventEmitter<string> = new EventEmitter<string>()

  onTextChange(){
    this.changed.emit(this.filterValue)
  }
  changeSortOrder(el: HTMLButtonElement){
    this.sortOrder = el.innerText.toLowerCase()
  }

  initForm() {
    this.showForm = true;
    this.editBoardForm = new FormGroup({
      'name': new FormControl(this.board.name),
      'description': new FormControl(this.board.description)
    })
  }
  hideForm(){
    this.showForm = false;
  }

  onSubmit(){
    this.showForm = false;
    this.store.dispatch(new WorkspaceActions.EditBoard({id: this.id, updatedBoard: this.editBoardForm.value}))
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }
}
