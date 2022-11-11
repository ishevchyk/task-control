import {Component, Input, OnInit} from '@angular/core';
import {List} from "../../../../shared/models/list.model";
import * as ListActions from '../../store/list.actions';
import * as fromApp from '../../../../store/app.reducer';
import {Store} from "@ngrx/store";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() list: List
  tasks: any

  editListForm: FormGroup;
  addTaskForm: FormGroup;
  showListForm = false;
  showTaskForm = false;
  isMenuOpened: boolean = false;


  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.tasks = this.list.tasks
  }

  onDeleteList(){
    console.log('in delete list ', this.list.name)
    this.store.dispatch(new ListActions.DeleteList(this.list._id))
  }
  onAddTask(){
    console.log('in task ', this.list.name)
    console.log(this.addTaskForm.value)
    this.store.dispatch(new ListActions.StartAddingTask({listId: this.list._id, task: this.addTaskForm.value}))

  }

  initListForm() {
    this.showListForm = true;

    this.editListForm = new FormGroup({
      'name': new FormControl(this.list.name),
    })
  }
  initTaskForm() {
    this.showTaskForm = true;
    this.addTaskForm = new FormGroup(
      {
        'content': new FormControl(null)
      }
    )
  }
  onListUpdate(){
    this.showListForm = false;
    this.store.dispatch(new ListActions.EditList({id: this.list._id, list: this.editListForm.value}))
    console.log(this.editListForm.value)
  }

}
