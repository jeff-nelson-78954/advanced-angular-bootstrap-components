import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef,
         ViewChild, AfterViewInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ScrollingTabDirective } from './scrolling-tab.directive';

@Component({
  selector: 'ngc-scrolling-tabs',
  templateUrl: './scrolling-tabs.component.html',
  styleUrls: ['./scrolling-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollingTabsComponent implements AfterViewInit {
  @ViewChild('navWrapper', { static: false }) navWrapper: ElementRef;
  @ViewChild('tabList', { static: false }) tabList: ElementRef;

  @Input() firstTabActive = true;
  @Input() scrollToActive = true;
  @Input() trackOpenTab = true;
  @Input() scrollBarWidths = 52;
  @Output() selectedTabChanged = new EventEmitter<ScrollingTabDirective>();

  tabs: ScrollingTabDirective[] = [];
  leftOffset = 0;
  firstVisibleTabIndex = -1;
  showLeftArrow = false;
  showRightArrow = false;

  constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // if there is a param of tabId and we want to track open tabs, mark the open tab as active
      if (this.route.snapshot.queryParams.tabId && this.trackOpenTab) {
        this.markTabAsActive(this.route.snapshot.queryParams.tabId);
      } else if (this.firstTabActive) { // if we should mark the first tab as active if a active tab is not specified
        this.markFirstTabActive();
      }

      if (this.scrollToActive) {
        this.scrollToActiveTab();
      }
      this.redrawTabs();
      this.changeDetector.detectChanges();
    }, 0);
  }

  addTab(tab: ScrollingTabDirective) {
    this.tabs.push(tab);
  }

  removeTab(tab: ScrollingTabDirective) {
    const index = this.tabs.indexOf(tab);
    if (index !== -1) {
      this.tabs.splice(index, 1);
    }
  }

  @HostListener('window:resize')
  clickInsideComponent() {
    this.redrawTabs();
  }

  redrawTabs() {
    // Take the total width of the list. Subtract how far right we are and see if that is greater than the
    // width of the current display
    if (this.widthOfList() + this.leftOffset > this.navWrapper.nativeElement.offsetWidth) {
      this.showRightArrow = true;
    } else {
      this.showRightArrow = false;
    }

    // see if we have scrolled right and we are not at the left most position
    if (this.leftOffset < 0) {
      this.showLeftArrow = true;
    } else {
      this.showLeftArrow = false;
    }
  }

  widthOfList() {
    let totalWidth = 0;
    for (const li of this.tabList.nativeElement.children) {
      totalWidth += li.offsetWidth;
    }
    return totalWidth;
  }

  onScrollerLeftClick() {
    // we need to go left for the width of the previous tab
    this.firstVisibleTabIndex--;
    // when moving left the left offset increases
    this.leftOffset += this.tabList.nativeElement.children[this.firstVisibleTabIndex].offsetWidth;
    this.redrawTabs();
  }

  onScrollerRightClick() {
    // when moving right you descrease the left offset. We want to go right the length of the current tab
    this.leftOffset -= this.tabList.nativeElement.children[this.firstVisibleTabIndex].offsetWidth;
    // change the index of the visible tab now that we have moved
    this.firstVisibleTabIndex++;
    this.redrawTabs();
  }

  onSelectedTabChanged(tab: ScrollingTabDirective) {
    this.markTabAsActive(tab.id);
    if (this.trackOpenTab) {
      this.pushCurrentTabToParam(tab);
    }
    this.selectedTabChanged.emit(tab);
  }

  markFirstTabActive() {
    const activeTab = this.tabs.find(t => t.active);
    //  if there is no active tab and we have tabs set first one to active
    if (!activeTab && this.tabs.length > 0) {
      this.tabs[0].active = true;
    }
  }

  scrollToActiveTab() {
    const activeTab = this.tabs.findIndex(t => t.active);
    this.firstVisibleTabIndex = activeTab;

    // change the view to set the active tab as first tab on the left
    for (let i = 0; i < activeTab; i++) {
      this.leftOffset -= this.tabList.nativeElement.children[i].offsetWidth;
    }
  }

  markTabAsActive(tabId: any) {
    for (const t of this.tabs) {
      t.active = false;
      if (t.id === tabId) {
        t.active = true;
      }
    }
  }

  pushCurrentTabToParam(tab: ScrollingTabDirective) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tabId: tab.id
      },
      queryParamsHandling: 'merge'
    });
  }
}
