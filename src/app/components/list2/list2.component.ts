import { Component, ViewChild } from '@angular/core';
import { SearchServiceToken } from '../../search/tokens/search-service.token';
import { SearchService } from '../../search/services/search.service';
import { SearchItem } from '../../search/interfaces/search-item.type';
import { SearchDirective } from '../../search/directives/search.directive';

@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.css'],
  providers: [
    {
      provide: SearchServiceToken,
      useClass: SearchService,
    },
  ],
})
export class List2Component {
  public items: SearchItem[] = [
    'list 2 element hop',
    'list 2 element hey',
    'list 2 element nanheyna',
    'list 2 element ginghoch',
  ];

  @ViewChild(SearchDirective)
  // @ts-ignore
  public appSearch: SearchDirective;

  public apply(): void {
    const renderredElements = `    - ${this.appSearch.renderredElements.join(
      '\n    - '
    )}`;
    alert(`Your visile elements: \n${renderredElements}`);
  }
}
