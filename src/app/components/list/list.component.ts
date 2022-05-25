import { Component } from '@angular/core';
import { SearchServiceToken } from '../../search/tokens/search-service.token';
import { SearchService } from '../../search/services/search.service';
import { SearchItem } from '../../search/interfaces/search-item.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    {
      provide: SearchServiceToken,
      useClass: SearchService,
    },
  ],
})
export class ListComponent {
  public items: SearchItem[] = [
    {
      value: 'list 1 element 1',
      otherProp: 123,
      id: 'hey1',
    },
    {
      value: 'list 1 element 2',
      otherProp: 123,
      id: 'hey2',
    },
    {
      value: 'list 1 element 3',
      otherProp: 123,
      id: 'hey3',
    },
    {
      value: 'list 1 element 4',
      otherProp: 123,
      id: 'hey4',
    },
    {
      value: 'list 1 element 5',
      otherProp: 123,
      id: 'hey5',
    },
  ];
}
