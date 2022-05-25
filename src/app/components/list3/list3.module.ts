import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List3Component } from './list3.component';
import { ItemModule } from '../item/item.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [List3Component],
  imports: [CommonModule, ItemModule, DragDropModule, MatIconModule],
  exports: [List3Component],
})
export class List3Module {}
