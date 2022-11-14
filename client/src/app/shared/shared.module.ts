import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlaceholderDirective} from "./placeholder.directive";
import {FilterPipe} from "./pipes/filter.pipe";
import {SortPipe} from "./pipes/sort.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PlaceholderDirective,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlaceholderDirective,
    FilterPipe,
    SortPipe
  ],
})
export class SharedModule { }
