import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PaginationMetadata } from './models/pagination-metadata';

@Component({
  selector: 'ngc-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent {
  @Input() pageinationMetaData: PaginationMetadata;
  @Input() floatRight = false;
  @Input() resultsHeader = 'Total Results:';
  @Input() pageSizes = [5, 10, 25, 50, 100];
  @Output() pagerChanged = new EventEmitter<PaginationMetadata>();

  constructor() { }

  onPageChanged(page: number) {
    if (page !== this.pageinationMetaData.currentPage) {
      this.pageinationMetaData.currentPage = page;
      this.pagerChanged.emit();
    }
  }

  onPageSizeChanged(pageSize: number) {
    if (pageSize !== this.pageinationMetaData.pageSize) {
      this.pageinationMetaData.currentPage = 1;
      this.pageinationMetaData.pageSize = pageSize;
      this.pagerChanged.emit();
    }
  }
}
