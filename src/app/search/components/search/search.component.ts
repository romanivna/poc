import { Component, ViewChild } from '@angular/core';
import { SearchInputDirective } from '../../directives/search-input.directive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @ViewChild(SearchInputDirective)
  // @ts-ignore
  public searchInput: SearchInputDirective;
}
