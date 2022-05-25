import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SecurityContext,
} from '@angular/core';
import { SearchServiceToken } from '../tokens/search-service.token';
import { ISearchService } from '../interfaces/search-service.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appSearchable]',
})
export class SearchableDirective implements OnInit, OnChanges {
  @Input()
  // @ts-ignore
  public appSearchable: string | null;

  @Input()
  public customClasses = '';

  constructor(
    @Optional()
    @Inject(SearchServiceToken)
    private searchService: ISearchService,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    // if element just reused without searching intention - searchService most likely
    // wouldn't be injected, so just set initial text
    if (!this.searchService) {
      this.setContent(this.appSearchable);
      return;
    }

    this.searchService.searchString$
      .pipe(untilDestroyed(this))
      .subscribe((searchString: string) => {
        this.handleSearchable(searchString);
      });
  }

  public ngOnChanges(changes: any): void {
    if (!this.searchService) {
      this.setContent(this.appSearchable);
      return;
    }

    if (changes.appSearchable && this.searchService) {
      this.appSearchable = changes.appSearchable.currentValue;
      this.handleSearchable(this.searchService.searchValue);
    }
  }

  private handleSearchable(searchString: string) {
    if (!this.elementRef?.nativeElement) {
      return;
    }

    // set initial content on search enpty
    if (searchString === '') {
      this.setContent(this.appSearchable);
    } else {
      const regex = new RegExp(
        searchString,
        this.searchService.isCaseSensitive ? 'g' : 'gi'
      );
      // generate html replacing mathing text with span which has classes to be styles
      const newText = this.appSearchable!.replace(regex, (match: string) => {
        return `<mark class="highlight ${this.customClasses}">${match}</mark>`;
      });
      const sanitzed = this.sanitizer.sanitize(SecurityContext.HTML, newText);

      this.setContent(sanitzed);
    }
  }

  private setContent(content: string | null): void {
    this.elementRef.nativeElement.innerHTML = content;
  }
}
