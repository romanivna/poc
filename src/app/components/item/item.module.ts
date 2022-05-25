import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ItemComponent } from './item.component';
import { SearchModule } from '../../search/search.module';

@NgModule({
  declarations: [ItemComponent],
  providers: [],
  imports: [CommonModule, MatCardModule, SearchModule],
  exports: [ItemComponent],
})
export class ItemModule {}
