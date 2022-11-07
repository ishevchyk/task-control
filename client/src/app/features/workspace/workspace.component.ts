import { Component, OnInit } from '@angular/core';
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

}
