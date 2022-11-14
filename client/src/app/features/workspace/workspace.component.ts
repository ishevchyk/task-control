import {Component, EventEmitter, OnInit, Output,} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as DashboardActions from './store/workspace.actions'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(){
    this.store.dispatch(new DashboardActions.FetchBoards())
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

}
