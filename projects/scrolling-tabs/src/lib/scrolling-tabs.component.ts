import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef,
         ViewChild, AfterViewInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() selectedTabChanged = new EventEmitter<ScrollingTabDirective>();

  tabs: ScrollingTabDirective[] = [];
  scrollBarWidths = 52;
  leftOffset = 0;
  firstVisibleTabIndex = -1;
  showLeftArrow = false;
  showRightArrow = false;

  constructor(public changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.firstTabActive) {
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

  onSelectedTabChanged(tab: ScrollingTabDirective) {
    for (const t of this.tabs) {
      t.active = false;
      if (t.id === tab.id) {
        t.active = true;
      }
    }
    this.selectedTabChanged.emit(tab);
  }
}
