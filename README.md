# Poc

Test purposes application.

## Features

### Search
* incapsulated search module which allows to highlight and filter any list within the box
* `appSearch` is the structural directive with input params
  * `appSearch` - accepts list of elements which should be iterated/filtered
  * `isCaseSensitive` - boolean property to know if search should be case sensitive or not
  * `listTemplate` - `ng-template` with the content of list element which would be iterated
  * `emptyTemplate` - `ng-template` with the content of block when search result would be empty

```html
<ng-template
  [appSearch]="items"
  [isCaseSensitive]="true"
  [listTemplate]="listTemplate"
  [emptyTemplate]="emptyTemplate">
</ng-template>

<ng-template #listTemplate let-item>
  {{ item.text }} - {{ item.value }}
</ng-template>

<ng-template #emptyTemplate>
  <div>Not found</div>
</ng-template>
```
 * search component - incapsulated component which can be replaced by any custom component
   * component has clear button
   * in case of custom component `appSearchInput` directive can be used (details further)
```html
 <app-search></app-search>
```
 * `appSearchInput` directive is used to communicate between input and search service
   * to make it working `changeValue` method should be called
   * in addition clear button can be added - `clear` method should be called to clear the value in input
```ts
  @ViewChild(SearchInputDirective)
  public searchInput: SearchInputDirective;
```
```html
<input appSearchInput #input (input)="searchInput.changeValue()">
<button [class.hidden]="!input.value" (click)="searchInput.clear()"></button>
```
 * `appSearchable` directive is used to highlight matches in text and search string
   * to make it working the source text should be passed inside the directive, not as a content
   * if element doesn't need to be searchable but used as a reusable component - you don't need any additional configs or flags
   * NOTE: is search case sensitive or not is taken from the `appSearch` directive, so it's synchronized
   * IMPORTANT: there shouldn't be any additional elements inside as far they can be removed on highlight time
```html
<span [appSearchable]="text"></span>
```
