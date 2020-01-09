import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerComponent } from './pager.component';
import { PaginationMetadata } from './models/pagination-metadata';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PagerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle onPageChanged for not current page', () => {
    const pagerData: PaginationMetadata | any = {
      currentPage: 5
    };
    const spy = spyOn(component.pagerChanged, 'emit');
    component.pageinationMetaData = pagerData;

    component.onPageChanged(1);

    expect(spy).toHaveBeenCalled();
    expect(component.pageinationMetaData.currentPage).toBe(1);
  });

  it('should handle onPageChanged for not current page', () => {
    const pagerData: PaginationMetadata | any = {
      currentPage: 1
    };
    const spy = spyOn(component.pagerChanged, 'emit');
    component.pageinationMetaData = pagerData;

    component.onPageChanged(1);

    expect(spy).not.toHaveBeenCalled();
    expect(component.pageinationMetaData.currentPage).toBe(1);
  });

  it('should handle onPageSizeChanged for current page size', () => {
    const pagerData: PaginationMetadata | any = {
      pageSize: 25,
      currentPage: 5
    };
    const spy = spyOn(component.pagerChanged, 'emit');
    component.pageinationMetaData = pagerData;

    component.onPageSizeChanged(5);

    expect(spy).toHaveBeenCalled();
    expect(component.pageinationMetaData.currentPage).toBe(1);
    expect(component.pageinationMetaData.pageSize).toBe(5);
  });

  it('should handle onPageSizeChanged for not current page size', () => {
    const pagerData: PaginationMetadata | any = {
      pageSize: 25,
      currentPage: 5
    };
    const spy = spyOn(component.pagerChanged, 'emit');
    component.pageinationMetaData = pagerData;

    component.onPageSizeChanged(25);

    expect(spy).not.toHaveBeenCalled();
    expect(component.pageinationMetaData.currentPage).toBe(5);
    expect(component.pageinationMetaData.pageSize).toBe(25);
  });
});
