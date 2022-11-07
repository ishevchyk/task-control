import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListsListComponent} from "./lists-list/lists-list.component";
import {ListItemComponent} from "./lists-list/list-item/list-item.component";
import { TaskItemComponent } from './lists-list/task-item/task-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    ListsListComponent,
    ListItemComponent,
    TaskItemComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
  exports: [
    ListsListComponent,
    ListItemComponent,
  ]
})
export class ListsModule { }
