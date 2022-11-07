import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as WorkspaceActions from '../../store/workspace.actions';


@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit, OnDestroy {

  newBoardForm: FormGroup;

  // @Input() board: Board;
  @Output() close = new EventEmitter<void>();

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.newBoardForm = new FormGroup({
      'name': new FormControl(null),
      'description': new FormControl(null)
    })
    // if(!this.board){
      this.newBoardForm.patchValue({
        'name': 'Board name',
        'description': 'Board description'
      })
    // } else {
    //   this.newBoardForm.patchValue({
    //     'name': this.board.name,
    //     'description': this.board.description
    //   })
    // }
  }
  ngOnDestroy() {
    // if(this.storeSub){
    //   this.storeSub.unsubscribe()
    // }
  }

  onFocus(el){
    console.log(el)
    el.value = ''
  }
  // onBlur(el){
  //   if(el.value.length === 0) {
  //     console.log(this.newBoardForm.)
  //   }
  // }
  onSubmit(){
    console.log(this.newBoardForm)
    this.onClose()
    // if(!this.board){
      this.store.dispatch(new WorkspaceActions.StartAddingBoard(this.newBoardForm.value))
    // } else {
    //   console.log('its edit mode')
    //   this.store.dispatch(new DashboardActions.EditBoard({id: this.board._id, updatedBoard: this.newBoardForm.value}))
    // }
  }
  onClose(){
    this.close.emit()
  }



}
