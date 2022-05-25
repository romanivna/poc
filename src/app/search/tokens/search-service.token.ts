import { InjectionToken } from '@angular/core';
import { ISearchService } from '../interfaces/search-service.interface';

/**
 * this token is an abstraction over SearchService
 * IMPORTANT: for single instance per NOT LAZY LOADED module - provide it to parent component directly
 */
export const SearchServiceToken = new InjectionToken<ISearchService>(
  'SearchService'
);
