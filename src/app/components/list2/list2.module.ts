import { NgModule } from '@angular/core';
import { List2Component } from './list2.component';
import { CommonModule } from '@angular/common';
import { ItemModule } from '../item/item.module';
import { MatButtonModule } from '@angular/material/button';
import { SearchModule } from '../../search/search.module';

@NgModule({
  declarations: [List2Component],
  imports: [CommonModule, ItemModule, MatButtonModule, SearchModule],
  exports: [List2Component],
})
export class List2Module {}
