# ScrollingTabs
This component is a scrollable responsive tab component build on Angular 8 and Bootstrap 4.

## Getting started
1) npm install ngc-scrolling-tabs
2) 

## Input options
1) If firstTabActive is true. On page load, if the active tab is not specified the first tab will be marked as active.
2) If scrollToActive is true. On page load, the active tab that is marked active will be scrolled to.

## Example
<ngc-scrolling-tabs [firstTabActive]="true" [scrollToActive]="true">
    <ngcScrollingTab id="home" title="Home">
        Tab 1 content
    </ngcScrollingTab>
    <ngcScrollingTab id="settings" title="Settings"  [active]="true">
        Tab 2 content
    </ngcScrollingTab>
</ngc-scrolling-tabs>


