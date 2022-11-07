import {Component, OnInit, ViewChild} from '@angular/core';
import { Subscription, map } from 'rxjs';
import {Board} from "../../../shared/models/board.model";
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {PlaceholderDirective} from "../../../shared/placeholder.directive";
import {NewBoardComponent} from "./new-board/new-board.component";
@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {

  boards: Board[];
  subscription: Subscription;

  @ViewChild(PlaceholderDirective, {static: false}) newBoardHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store
      .select('workspace')
      .pipe(
        map(workspaceState => {
          return workspaceState.boards
        })
      )
      .subscribe( (boards: Board[]) => {
          this.boards = boards;
        }
      )
  }
  onAddNewBoard(){
    this.showForm()
  }
  // onEditBoard(board: Board){
  //   const viewContainerRef = this.newBoardHost.viewContainerRef;
  //   const componentRef = viewContainerRef.createComponent(NewBoardComponent);
  //   componentRef.instance.board = board;
  //
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     viewContainerRef.clear();
  //   })
  // }

  private showForm() {
    const viewContainerRef = this.newBoardHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(NewBoardComponent);

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    })
  }

}
