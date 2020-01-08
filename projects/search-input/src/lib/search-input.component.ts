import { Component, Output, EventEmitter, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ngc-search-input',
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('txtSearchInput', { static: false }) txtSearchInput: ElementRef;
  @Input() config = {
    placeholderText: 'Search...',
    minSearchLength: 3,
    searchLengthError: 'Search term must be at least 3 characters',
    debounceTime: 500
  };
  @Output() searchInputChanged = new EventEmitter<string>();
  searchSubscription: Subscription;
  smallSearchTermError = false;

  constructor(public changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.listenForSearch();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  listenForSearch() {
    this.searchSubscription = fromEvent(this.txtSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // Time in milliseconds between key events
      , debounceTime(this.config.debounceTime)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      if (text.length < this.config.minSearchLength && text.length !== 0) {
        this.smallSearchTermError = true;
      } else {
        this.smallSearchTermError = false;
        this.searchInputChanged.emit(text);
      }
    });
  }

}
