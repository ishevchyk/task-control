import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import {WorkspaceRoutingModule} from "./workspace-routing.module";
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardItemComponent } from './boards-list/board-item/board-item.component';
import { NewBoardComponent } from './boards-list/new-board-item/new-board.component';
import {SharedModule} from "../../shared/shared.module";
import { BoardPageComponent } from './board-page/board-page.component';
import {ListsModule} from "../lists/lists.module";
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [
    WorkspaceComponent,
    BoardsListComponent,
    BoardItemComponent,
    NewBoardComponent,
    BoardPageComponent,
  ],
    imports: [
        WorkspaceRoutingModule,
        SharedModule,
        ListsModule,
        DragDropModule
    ],
})
export class WorkspaceModule { }
