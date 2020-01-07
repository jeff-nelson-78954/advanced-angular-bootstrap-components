import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingTabsComponent } from './scrolling-tabs.component';

describe('ScrollingTabsComponent', () => {
  let component: ScrollingTabsComponent;
  let fixture: ComponentFixture<ScrollingTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollingTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
