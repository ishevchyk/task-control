import {Component, Input, OnInit} from '@angular/core';

import {Task} from "../../../../shared/models/task.model";

import * as fromApp from '../../../../store/app.reducer';
import * as ListActions from '../../store/list.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  @Input() task: Task
  taskDate: string;
  show: boolean = false;

  ngOnInit(): void {
    this.taskDate = new Date(this.task.createdDate).toLocaleDateString()
  }

  onshow(){
    this.show = !this.show;
  }
  close() {
    this.show = false;
  }
  onDeleteTask(){
    this.store.dispatch(new ListActions.DeleteTask({listId: this.task.listId, taskId: this.task._id}))
  }


}
