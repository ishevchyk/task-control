import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../../shared/models/task.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducer";
import * as ListActions from '../../store/list.actions';
import {map} from 'rxjs'
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  @Input() task: Task;
  @Output() close = new EventEmitter<void>();

  cover: string;
  comments: string[];
  creationDate: string;
  lastUpdateDate: string;

  showCommentForm = false;
  addCommentForm: FormGroup;

  ngOnInit(): void {
    this.store.select('list').pipe(
      map(listsState => listsState.activeComments)
    ).subscribe( comments => {
        this.comments = comments;
      }
    )
    this.cover = this.task.cover;
    this.creationDate = new Date(this.task.createdDate).toLocaleString();
    this.lastUpdateDate = new Date(this.task.updatedAt).toLocaleString();
  }

  onClose(){
    this.close.emit();
    this.store.dispatch(new ListActions.ClearActiveComments());
    window.location.reload();
  }
  initCommentForm() {
    this.showCommentForm = !this.showCommentForm;
    this.addCommentForm = new FormGroup(
      {
        'comment': new FormControl(null)
      }
    )
  }

  onDeleteTask(){
    this.store.dispatch(new ListActions.DeleteTask({listId: this.task.listId, taskId: this.task._id}))
  }

  onAddComment(){
    this.store.dispatch(new ListActions.AddComment({taskId: this.task._id, comment: this.addCommentForm.value}))
    this.showCommentForm = !this.showCommentForm;
  }
  deleteComment(i: number){
    console.log(i)
    this.store.dispatch(new ListActions.DeleteComment({taskId: this.task._id, index: i}))
  }


  onColorChange(){
    setTimeout(() => {
      this.store.dispatch(new ListActions.EditTask({task: this.task, dataToUp: {'cover': this.cover}}))
    }, 1000)
  }

}
