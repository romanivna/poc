import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SearchServiceToken } from '../tokens/search-service.token';
import { ISearchService } from '../interfaces/search-service.interface';
import { SearchItem } from '../interfaces/search-item.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appSearch]',
})
export class SearchDirective implements OnChanges {
  constructor(
    @Inject(SearchServiceToken) private searchService: ISearchService,
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input('appSearch')
  // @ts-ignore
  public items: SearchItem[];

  @Input()
  // @ts-ignore
  public searchField: string;

  @Input()
  // @ts-ignore
  public listTemplate: TemplateRef<any>;

  @Input()
  // @ts-ignore
  public emptyTemplate: TemplateRef<any>;

  @Input()
  // @ts-ignore
  public isCaseSensitive: boolean;

  // @ts-ignore
  public renderredElements: SearchItem[];

  public ngOnInit(): void {
    // rerender list on search changed
    this.searchService.searchString$
      .pipe(untilDestroyed(this))
      .subscribe((searchString: string) => {
        this.renderList(this.items, searchString);
      });
  }

  public ngOnChanges(changes: any): void {
    if (changes.isCaseSensitive) {
      this.searchService.isCaseSensitive =
        changes.isCaseSensitive?.currentValue;
    }

    if (changes.items && changes.items.currentValue) {
      // rerender list when source array changed
      this.renderList(
        changes.items.currentValue,
        this.searchService.searchValue
      );
    }
  }

  private renderList(items: SearchItem[], searchValue: string): void {
    // remove all elements
    this.viewContainerRef.clear();
    // clear stored array of renderred elements
    this.renderredElements = [];

    let isAtLeastOneMatch = false;

    items.forEach((value: SearchItem, index: number) => {
      let isMatch = this.getMatch(value, searchValue);

      if (isMatch) {
        isAtLeastOneMatch = true;
        this.renderredElements.push(value);

        // render one element
        this.viewContainerRef.createEmbeddedView(this.listTemplate, {
          // object or primitive value which was initially passed
          $implicit: value,
          index,
        });
      }
    });

    if (!isAtLeastOneMatch && this.emptyTemplate) {
      // render empty template if such exist
      this.viewContainerRef.createEmbeddedView(this.emptyTemplate, {
        $implicit: [],
      });
    }
  }

  private getMatch(value: SearchItem, searchString: string): boolean {
    let stringValue = value.toString();

    // compare value in object given field
    if (typeof value === 'object') {
      stringValue =
        (this.searchField && value[this.searchField].toString()) || '';
    }

    // for non-case-sensitive configurations move both values to lowecase
    const stringToCompare = this.searchService.isCaseSensitive
      ? stringValue.toString()
      : stringValue.toString().toLowerCase();

    const searchToCompare = this.searchService.isCaseSensitive
      ? searchString
      : searchString.toLowerCase();

    return stringToCompare.includes(searchToCompare);
  }
}
