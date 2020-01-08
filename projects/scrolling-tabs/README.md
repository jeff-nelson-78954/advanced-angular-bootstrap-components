# ScrollingTabs
This component is a scrollable responsive tab component build on Angular 8 and Bootstrap 4.

## Getting started
- Install the package -> npm install ngc-scrolling-tabs
- Add import to your Angular Module -> import { ScrollingTabsModule } from 'ngc-scrolling-tabs';

## Input options
- [firstTabActive] -> Used on page load, if the active tab is not specified the first tab will be marked as active.
- [scrollToActive] -> Used on page load, the active tab that is marked active will be scrolled to.

## Output
(selectedTabChanged) -> Fired when a user changes tabs.

## Example
```shell
<ngc-scrolling-tabs [firstTabActive]="true" [scrollToActive]="true">
    <ngcScrollingTab id="home" title="Home">
        Tab 1 content
    </ngcScrollingTab>
    <ngcScrollingTab id="settings" title="Settings"  [active]="true">
        Tab 2 content
    </ngcScrollingTab>
</ngc-scrolling-tabs>
```

