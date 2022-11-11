import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlaceholderDirective} from "./placeholder.directive";
import {FilterPipe} from "./pipes/filter.pipe";
import {SortPipe} from "./pipes/sort.pipe";



@NgModule({
  declarations: [
    PlaceholderDirective,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    PlaceholderDirective,
    FilterPipe,
    SortPipe
  ],
})
export class SharedModule { }
