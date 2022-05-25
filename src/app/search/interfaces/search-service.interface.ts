import { Observable } from 'rxjs';

export type ISearchService = {
  searchString$: Observable<string>;
  searchValue: string;
  isCaseSensitive: boolean;

  setSearch(searchString: string): void;
};
