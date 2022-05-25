import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { CommonModule } from '@angular/common';
import { ItemModule } from '../item/item.module';
import { MatIconModule } from '@angular/material/icon';
import { SearchModule } from '../../search/search.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ItemModule, MatIconModule, SearchModule],
  exports: [ListComponent],
})
export class ListModule {}
