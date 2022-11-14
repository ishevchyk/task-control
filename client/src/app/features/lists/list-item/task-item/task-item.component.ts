import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {Task} from "../../../../shared/models/task.model";

import * as fromApp from '../../../../store/app.reducer';
import * as ListActions from '../../store/list.actions';
import {Store} from "@ngrx/store";
import {PlaceholderDirective} from "../../../../shared/placeholder.directive";
import {Subscription} from "rxjs";
import {TaskModalComponent} from "../task-modal/task-modal.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  @ViewChild(PlaceholderDirective, {static: false}) taskModalHost: PlaceholderDirective;
  private closeSub: Subscription;

  @Input() task: Task
  taskDate: string;
  editTask: boolean = false;
  commentsLength: number;

  ngOnInit(): void {
    this.taskDate = new Date(this.task.createdDate).toLocaleDateString();
    this.commentsLength = this.task.comments.length;
  }

  onStartEditTask(){
    this.editTask = !this.editTask;
  }
  onEditTask(form: NgForm) {
    if(!form.valid) {
      return;
    }
    console.log(form.value)
    this.store.dispatch(new ListActions.EditTask({task: this.task, dataToUp: form.value}))
    this.editTask = !this.editTask;
  }

  openTaskModal(task: Task){
    this.store.dispatch(new ListActions.SetActiveComments(this.task.comments))
    const viewContainerRef = this.taskModalHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(TaskModalComponent);

    componentRef.instance.task = task;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    })
  }


}
