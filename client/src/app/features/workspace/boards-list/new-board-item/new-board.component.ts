import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as WorkspaceActions from '../../store/workspace.actions';


@Component({
  selector: 'app-new-board-item',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  newBoardForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    this.newBoardForm = new FormGroup({
      'name': new FormControl(null),
      'description': new FormControl(null)
    })
    this.newBoardForm.patchValue({
      'name': 'Board name',
      'description': 'Board description'
    })
  }

  onFocus(el){
    console.log(el)
    el.value = ''
  }
  onSubmit(){
    this.onClose()
    this.store.dispatch(new WorkspaceActions.StartAddingBoard(this.newBoardForm.value))
  }
  onClose(){
    this.close.emit()
  }

  constructor(
    private store: Store<fromApp.AppState>
  ) {}
}
