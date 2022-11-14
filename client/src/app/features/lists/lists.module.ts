import { NgModule } from '@angular/core';
import {ListItemComponent} from "./list-item/list-item.component";
import { TaskItemComponent } from './list-item/task-item/task-item.component';
import {SharedModule} from "../../shared/shared.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ListsComponent } from './lists.component';
import { TaskModalComponent } from './list-item/task-modal/task-modal.component';


@NgModule({
  declarations: [
    ListItemComponent,
    TaskItemComponent,
    ListsComponent,
    TaskModalComponent,
  ],
    imports: [
       SharedModule,
        DragDropModule,
    ],
  exports: [
    ListItemComponent,
    TaskItemComponent,
    ListsComponent
  ]
})
export class ListsModule { }
