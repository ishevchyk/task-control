import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from "../../../shared/models/list.model";
import * as ListActions from '../store/list.actions';
import * as fromApp from '../../../store/app.reducer';
import {Store} from "@ngrx/store";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() list: List
  @Input() filterValue: string = '';
  @Input() sortValue: string = '';
  @Input() sortOrder: string = '';
  tasks: any

  editListForm: FormGroup;
  addTaskForm: FormGroup;
  showListForm = false;
  showTaskForm = false;
  cover: string;

  @Output() changed: EventEmitter<string> = new EventEmitter<string>()


  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.tasks = [...this.list.tasks];
    this.cover = this.list.cover;
  }

  onDeleteList(){
    this.store.dispatch(new ListActions.DeleteList(this.list._id))
  }
  onAddTask(){
    this.store.dispatch(new ListActions.StartAddingTask({listId: this.list._id, task: this.addTaskForm.value}))
  }

  initListForm() {
    this.showListForm = !this.showListForm;
    if(this.showListForm){
      this.editListForm = new FormGroup({
        'name': new FormControl(this.list.name),
      })
    }
  }
  initTaskForm() {
    this.showTaskForm = !this.showTaskForm;
    this.addTaskForm = new FormGroup(
      {
        'content': new FormControl(null)
      }
    )
  }
  onListUpdate(){
    this.showListForm = false;
    this.store.dispatch(new ListActions.EditList({id: this.list._id, dataToUp: this.editListForm.value}))
  }

  onColorChange(){
    setTimeout(() => {
      this.store.dispatch(new ListActions.EditList({id: this.list._id, dataToUp: {'cover': this.cover}}))
    }, 1500)
  }

}
