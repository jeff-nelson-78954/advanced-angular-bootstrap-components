# ScrollingTabs
This component is a scrollable responsive tab component build on Angular 8 and Bootstrap 4. 
 The left and right nav buttons will scroll one tab at a time. The component will track what tab is open
 and re-navigate to the open tab when the screen is refreshed. Any bootstrap theme or tab styling will 
 automatically apply to this component. The Component should be placed in a container and the angular 
 routing module should be configured in the consuming app.

## Getting started
- Install the package 
```shell
npm install ngc-scrolling-tabs
```
- Add import to your Angular Module 
```shell
import { ScrollingTabsModule } from 'ngc-scrolling-tabs';
```
## Input options
- [firstTabActive] -> Used on page load, if the active tab is not specified the first tab will be marked as active.
- [scrollToActive] -> Used on page load, the active tab that is marked active will be scrolled to.
- [trackOpenTab] -> Used to track what tab is open as a url parameter. If the page is refreshed it will default to that tab.
- [scrollBarWidths] -> If your styles affect the scroll bar widths you will need to adjust this setting so tab scrolling continues to work properly.

## Output
(selectedTabChanged) -> Fired when a user changes tabs.

## Example
```shell
<ngc-scrolling-tabs [firstTabActive]="true" [scrollToActive]="true" [trackOpenTab]="false">
    <ngcScrollingTab id="home" title="Home">
        Tab 1 content
    </ngcScrollingTab>
    <ngcScrollingTab id="settings" title="Settings"  [active]="true">
        Tab 2 content
    </ngcScrollingTab>
</ngc-scrolling-tabs>
```

![Scrolling Tabs - Light Theme](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/scrollingtabs_light.png)

![Scrolling Tabs - Dark Theme](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/scrollingtabs_dark.png)

