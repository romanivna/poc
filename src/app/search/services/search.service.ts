import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISearchService } from '../interfaces/search-service.interface';

@Injectable()
export class SearchService implements ISearchService {
  private searchString$$ = new BehaviorSubject<string>('');

  public isCaseSensitive = false;

  public get searchString$(): Observable<string> {
    return this.searchString$$.pipe();
  }
  public get searchValue(): string {
    return this.searchString$$.getValue();
  }

  public setSearch(searchString: string): void {
    this.searchString$$.next(searchString);
  }
}
