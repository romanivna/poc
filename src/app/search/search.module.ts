import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { SearchDirective } from './directives/search.directive';
import { SearchableDirective } from './directives/searchable.directive';
import { SearchInputDirective } from './directives/search-input.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SearchDirective,
    SearchableDirective,
    SearchInputDirective,
    SearchComponent,
  ],
  providers: [],
  exports: [
    SearchDirective,
    SearchableDirective,
    SearchInputDirective,
    SearchComponent,
  ],
  imports: [MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule],
})
export class SearchModule {}
