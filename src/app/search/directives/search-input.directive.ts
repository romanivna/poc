import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SearchServiceToken } from '../tokens/search-service.token';
import { ISearchService } from '../interfaces/search-service.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: 'input[appSearchInput]',
})
export class SearchInputDirective implements OnInit {
  constructor(
    @Inject(SearchServiceToken) private searchService: ISearchService,
    private elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    this.searchService.searchString$
      .pipe(untilDestroyed(this))
      .subscribe(
        (searchString: string) =>
          (this.elementRef.nativeElement.value = searchString)
      );
  }

  public clear(): void {
    this.searchService.setSearch('');
  }

  public changeValue() {
    const currentValue = this.searchService.searchValue;

    if (this.elementRef.nativeElement.value !== currentValue) {
      this.searchService.setSearch(this.elementRef.nativeElement.value);
    }
  }
}
