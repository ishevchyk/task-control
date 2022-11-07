import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../../shared/models/board.model";
import * as fromApp from '../../../../store/app.reducer';
import {Store} from "@ngrx/store";
import * as WorkspaceActions from '../../store/workspace.actions';
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {
  @Input() board: Board;
  @Input() index: number;
  id: string;
  listsLength: number;
  boardDate: string


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listsLength = this.board.lists.length;
    this.boardDate = new Date(this.board.createdDate).toLocaleDateString()
  }

  toBoardPage(board: Board) {
    if(board){
      this.store.dispatch(new WorkspaceActions.SetActiveBoard(board));
      this.router.navigate([this.board._id], {relativeTo: this.route})
    }
  }

  deleteBoard() {
    this.id = this.board._id
    this.store.dispatch(new WorkspaceActions.DeleteBoard(this.id))
  }


}
