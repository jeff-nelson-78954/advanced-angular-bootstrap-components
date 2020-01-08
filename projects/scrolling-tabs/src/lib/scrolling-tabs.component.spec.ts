import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ScrollingTabsComponent } from './scrolling-tabs.component';
import { ScrollingTabDirective } from './scrolling-tab.directive';


describe('ScrollingTabsComponent', () => {
  let component: ScrollingTabsComponent;
  let fixture: ComponentFixture<ScrollingTabsComponent>;
  let mockRoute: ActivatedRoute | any;
  let mockChangeDetectorRef: ChangeDetectorRef | any;
  let mockRouter: Router | any;

  beforeEach(async(() => {
    mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = { snapshot: { queryParams: {} } };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ScrollingTabsComponent, ScrollingTabDirective],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should markTabAsActive if tabId is in the query param and trackOpenTab is true', fakeAsync(() => {
    const expectedTabId = 3333;
    mockRoute = { snapshot: { queryParams: { tabId: expectedTabId }} };
    component = new ScrollingTabsComponent(mockChangeDetectorRef, mockRoute, mockRouter);
    component.trackOpenTab = true;
    component.scrollToActive = true;
    component.firstTabActive = true;

    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const markFirstTabActiveSpy = spyOn(component, 'markFirstTabActive');
    const redrawTabsSpy = spyOn(component, 'redrawTabs');
    const scrollToActiveTabSpy = spyOn(component, 'scrollToActiveTab');

    component.ngAfterViewInit();

    tick(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(markTabAsActiveSpy).toHaveBeenCalledWith(expectedTabId);
      expect(markFirstTabActiveSpy).not.toHaveBeenCalled();
      expect(scrollToActiveTabSpy).toHaveBeenCalled();
      expect(redrawTabsSpy).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    expect(component).toBeTruthy();
  }));

  it('should not markTabAsActive if tabId is not in the query param and trackOpenTab is true', fakeAsync(() => {
    mockRoute = { snapshot: { queryParams: { } } };
    component = new ScrollingTabsComponent(mockChangeDetectorRef, mockRoute, mockRouter);
    component.trackOpenTab = true;
    component.scrollToActive = true;
    component.firstTabActive = true;

    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const markFirstTabActiveSpy = spyOn(component, 'markFirstTabActive');
    const redrawTabsSpy = spyOn(component, 'redrawTabs');
    const scrollToActiveTabSpy = spyOn(component, 'scrollToActiveTab');

    component.ngAfterViewInit();

    tick(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(markTabAsActiveSpy).not.toHaveBeenCalled();
      expect(markFirstTabActiveSpy).toHaveBeenCalled();
      expect(scrollToActiveTabSpy).toHaveBeenCalled();
      expect(redrawTabsSpy).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    expect(component).toBeTruthy();
  }));

  it('should not markTabAsActive if tabId is in the query param and trackOpenTab is false', fakeAsync(() => {
    const expectedTabId = 3333;
    mockRoute = { snapshot: { queryParams: { tabId: expectedTabId } } };
    component = new ScrollingTabsComponent(mockChangeDetectorRef, mockRoute, mockRouter);
    component.trackOpenTab = false;
    component.scrollToActive = true;
    component.firstTabActive = true;

    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const markFirstTabActiveSpy = spyOn(component, 'markFirstTabActive');
    const redrawTabsSpy = spyOn(component, 'redrawTabs');
    const scrollToActiveTabSpy = spyOn(component, 'scrollToActiveTab');

    component.ngAfterViewInit();

    tick(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(markTabAsActiveSpy).not.toHaveBeenCalled();
      expect(markFirstTabActiveSpy).toHaveBeenCalled();
      expect(scrollToActiveTabSpy).toHaveBeenCalled();
      expect(redrawTabsSpy).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    expect(component).toBeTruthy();
  }));

  it('should not markTabAsActive if tabId is not in the query param and trackOpenTab is false', fakeAsync(() => {
    mockRoute = { snapshot: { queryParams: { } } };
    component = new ScrollingTabsComponent(mockChangeDetectorRef, mockRoute, mockRouter);
    component.trackOpenTab = false;
    component.scrollToActive = true;
    component.firstTabActive = true;

    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const markFirstTabActiveSpy = spyOn(component, 'markFirstTabActive');
    const redrawTabsSpy = spyOn(component, 'redrawTabs');
    const scrollToActiveTabSpy = spyOn(component, 'scrollToActiveTab');

    component.ngAfterViewInit();

    tick(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(markTabAsActiveSpy).not.toHaveBeenCalled();
      expect(markFirstTabActiveSpy).toHaveBeenCalled();
      expect(scrollToActiveTabSpy).toHaveBeenCalled();
      expect(redrawTabsSpy).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    expect(component).toBeTruthy();
  }));

  it('should not call markFirstTabActive if no tab id is passed in and firstTabActive setting is false', fakeAsync(() => {
    mockRoute = { snapshot: { queryParams: {} } };
    component = new ScrollingTabsComponent(mockChangeDetectorRef, mockRoute, mockRouter);
    component.trackOpenTab = false;
    component.scrollToActive = true;
    component.firstTabActive = false;

    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const markFirstTabActiveSpy = spyOn(component, 'markFirstTabActive');
    const redrawTabsSpy = spyOn(component, 'redrawTabs');
    const scrollToActiveTabSpy = spyOn(component, 'scrollToActiveTab');

    component.ngAfterViewInit();

    tick(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(markTabAsActiveSpy).not.toHaveBeenCalled();
      expect(markFirstTabActiveSpy).not.toHaveBeenCalled();
      expect(scrollToActiveTabSpy).toHaveBeenCalled();
      expect(redrawTabsSpy).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    expect(component).toBeTruthy();
  }));

  it('should not call scrollToActiveTab if setting is false', fakeAsync(() => {
    mockRoute = { snapshot: { queryParams: {} } };
    component = new ScrollingTabsComponent(mockChangeDetectorRef, mockRoute, mockRouter);
    component.trackOpenTab = false;
    component.scrollToActive = false;
    component.firstTabActive = false;

    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const markFirstTabActiveSpy = spyOn(component, 'markFirstTabActive');
    const redrawTabsSpy = spyOn(component, 'redrawTabs');
    const scrollToActiveTabSpy = spyOn(component, 'scrollToActiveTab');

    component.ngAfterViewInit();

    tick(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(markTabAsActiveSpy).not.toHaveBeenCalled();
      expect(markFirstTabActiveSpy).not.toHaveBeenCalled();
      expect(scrollToActiveTabSpy).not.toHaveBeenCalled();
      expect(redrawTabsSpy).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    expect(component).toBeTruthy();
  }));

  it('should handle addTab', () => {
    const expectedTab = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    component.tabs = [];

    component.addTab(expectedTab);

    expect(component.tabs[0]).toBe(expectedTab);
  });

  it('should handle removeTab', () => {
    const expectedTab = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    component.tabs = [expectedTab];

    component.removeTab(expectedTab);

    expect(component.tabs.length).toBe(0);
  });

  it('should handle not found removeTab', () => {
    const expectedTab = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    const expectedRemovedTab = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    component.tabs = [expectedTab];

    component.removeTab(expectedRemovedTab);

    expect(component.tabs.length).toBe(1);
  });

  it('should handle clickInsideComponent', () => {
    const redrawTabsSpy = spyOn(component, 'redrawTabs');

    component.windowResize();

    expect(redrawTabsSpy).toHaveBeenCalled();
  });

  it('should handle redrawTabs for showing right arrow', () => {
    component.showRightArrow = false;
    component.leftOffset = 0;
    spyOn(component, 'widthOfList').and.returnValue(10000);

    component.redrawTabs();

    expect(component.showRightArrow).toBeTruthy();
  });

  it('should handle redrawTabs for not showing right arrow', () => {
    component.showRightArrow = true;
    component.leftOffset = 0;
    spyOn(component, 'widthOfList').and.returnValue(0);

    component.redrawTabs();

    expect(component.showRightArrow).toBeFalsy();
  });

  it('should handle redrawTabs for not showing left arrow', () => {
    component.showLeftArrow = false;
    component.leftOffset = -10000;
    spyOn(component, 'widthOfList').and.returnValue(0);

    component.redrawTabs();

    expect(component.showLeftArrow).toBeTruthy();
  });

  it('should handle redrawTabs for showing left arrow', () => {
    component.showLeftArrow = true;
    component.leftOffset = 0;
    spyOn(component, 'widthOfList').and.returnValue(0);

    component.redrawTabs();

    expect(component.showLeftArrow).toBeFalsy();
  });

  it('should handle widthOfList', () => {
    const natEl = { nativeElement: { children: [
      { offsetWidth: 100 },
      { offsetWidth: 200 }
    ]}};
    component.tabList = natEl;
    const result = component.widthOfList();

    expect(result).toBe(300);
  });

  it('should handle onScrollerLeftClick', () => {
    const spy = spyOn(component, 'redrawTabs');
    const expectedOffset = 100;
    component.firstVisibleTabIndex = 1;
    component.leftOffset = 0;
    const natEl = {
      nativeElement: {
        children: [
          { offsetWidth: expectedOffset },
          { offsetWidth: 200 }
        ]
      }
    };
    component.tabList = natEl;

    component.onScrollerLeftClick();

    expect(component.leftOffset).toBe(expectedOffset);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle onScrollerRightClick', () => {
    const spy = spyOn(component, 'redrawTabs');
    const expectedOffset = 100;
    component.firstVisibleTabIndex = 1;
    component.leftOffset = 0;
    const natEl = {
      nativeElement: {
        children: [
          { offsetWidth: 200 },
          { offsetWidth: expectedOffset }
        ]
      }
    };
    component.tabList = natEl;

    component.onScrollerRightClick();

    expect(component.leftOffset).toBe(-expectedOffset);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle onSelectedTabChanged when tracking open tabs', () => {
    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const pushCurrentTabToParamSpy = spyOn(component, 'pushCurrentTabToParam');
    const selectedTabChangedSpy = spyOn(component.selectedTabChanged, 'emit');
    const expectedTab = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    expectedTab.id = 1234;
    component.trackOpenTab = true;

    component.onSelectedTabChanged(expectedTab);

    expect(markTabAsActiveSpy).toHaveBeenCalledWith(expectedTab.id);
    expect(pushCurrentTabToParamSpy).toHaveBeenCalledWith(expectedTab);
    expect(selectedTabChangedSpy).toHaveBeenCalledWith(expectedTab);
  });

  it('should handle onSelectedTabChanged when not tracking open tabs', () => {
    const markTabAsActiveSpy = spyOn(component, 'markTabAsActive');
    const pushCurrentTabToParamSpy = spyOn(component, 'pushCurrentTabToParam');
    const selectedTabChangedSpy = spyOn(component.selectedTabChanged, 'emit');
    const expectedTab = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    expectedTab.id = 1234;
    component.trackOpenTab = false;

    component.onSelectedTabChanged(expectedTab);

    expect(markTabAsActiveSpy).toHaveBeenCalledWith(expectedTab.id);
    expect(pushCurrentTabToParamSpy).not.toHaveBeenCalled();
    expect(selectedTabChangedSpy).toHaveBeenCalledWith(expectedTab);
  });

  it('should handle markFirstTabActive with no active tabs', () => {
    const tab1 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab1.active = false;
    const tab2 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab2.active = false;
    component.tabs = [
      tab1,
      tab2
    ];

    component.markFirstTabActive();

    expect(component.tabs[0].active).toBeTruthy();
  });

  it('should handle markFirstTabActive with active tabs', () => {
    const tab1 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab1.active = false;
    const tab2 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab2.active = true;
    component.tabs = [
      tab1,
      tab2
    ];

    component.markFirstTabActive();

    expect(component.tabs[1].active).toBeTruthy();
  });

  it('should handle markFirstTabActive with no tabs', () => {
    component.tabs = [];

    component.markFirstTabActive();

    expect(component.tabs.length).toBe(0);
  });

  it('should handle scrollToActiveTab', () => {
    const expectedOffset = 100;
    component.firstVisibleTabIndex = -1;
    const tab1 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab1.active = false;
    const tab2 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab2.active = true;
    component.tabs = [
      tab1,
      tab2
    ];
    const natEl = {
      nativeElement: {
        children: [
          { offsetWidth: expectedOffset },
          { offsetWidth: 200 }
        ]
      }
    };
    const oldList = component.tabList;
    component.tabList = natEl;

    component.scrollToActiveTab();

    expect(component.leftOffset).toBe(-expectedOffset);
    expect(component.firstVisibleTabIndex).toBe(1);
  });

  it('should handle markTabAsActive', () => {
    const expectedId = 1234;
    const tab1 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab1.active = false;
    tab1.id = expectedId;
    const tab2 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab2.active = true;
    tab2.id = 7898;
    component.tabs = [
      tab1,
      tab2
    ];

    component.markTabAsActive(expectedId);

    expect(component.tabs[0].active).toBeTruthy();
    expect(component.tabs[1].active).toBeFalsy();
  });

  it('should handle pushCurrentTabToParam', () => {
    const expectedId = 1234;
    const tab1 = jasmine.createSpyObj('ScrollingTabDirective', ['getTabClasses']);
    tab1.id = expectedId;
    const expectedObject = {
      relativeTo: mockRoute,
      queryParams: {
        tabId: expectedId
      },
      queryParamsHandling: 'merge'
    };

    component.pushCurrentTabToParam(tab1);

    expect(mockRouter.navigate).toHaveBeenCalledWith([], expectedObject);
  });

});
