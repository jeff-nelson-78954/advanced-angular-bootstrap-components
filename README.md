# Advanced Angular Bootstrap Components

This library is a work in progress that will contain some advanced Angular components build on Angular 8 and Bootstrap 4.

## Build the project and view the library components.
```shell
npm install
npm run start
```

## Table of Contents
- [ScrollingTabs](#scrolling-tabs)
- [SearchInput](#search-input)
- [Adding component to the library](#adding-component-to-the-library)

# Scrolling Tabs
This component is a scrollable responsive tab component build on Angular 8 and Bootstrap 4. 
 The left and right nav buttons will scroll one tab at a time. The component will track what tab is open
 and re-navigate to the open tab when the screen is refreshed. Any bootstrap theme or tab styling will 
 automatically apply to this component. The component should be placed in a container and the angular 
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

## Inputs
- [firstTabActive] -> Used on page load, if the active tab is not specified the first tab will be marked as active.
- [scrollToActive] -> Used on page load, the active tab that is marked active will be scrolled to.
- [trackOpenTab] -> Used to track what tab is open as a url parameter. If the page is refreshed it will default to that tab.
- [scrollBarWidths] -> If your styles affect the scroll bar widths you will need to adjust this setting so tab scrolling continues to work properly.

## Outputs
(selectedTabChanged) -> Fired when a user changes tabs.

## Example
```shell
<ngc-scrolling-tabs [firstTabActive]="true" [scrollToActive]="true" [trackOpenTab]="false">
    <ngcScrollingTab id="home" title="Home">
        Tab 1 content
    </ngcScrollingTab>
    <ngcScrollingTab id="settings" title="Settings" [active]="true">
        Tab 2 content
    </ngcScrollingTab>
</ngc-scrolling-tabs>
```

![Scrolling Tabs - Light Theme](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/scrollingtabs_light.png)

![Scrolling Tabs - Dark Theme](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/scrollingtabs_dark.png)

# Search Input
This component is a search input field built on Angular 8 and Bootstrap 4. 
 It listens for input, pauses for a set duration (default 500 ms), checks for unique values, and then emits the text in the search field.
 Can be used to auto search a datasource automatically as a user is typing. Emits a changed event if the input field is cleared.

## Getting started
- Install the package 
```shell
npm install ngc-search-input
```
- Add import to your Angular Module 
```shell
import { SearchInputModule } from 'ngc-search-input';
```

## Input
- [config] -> Used to set multiple settings for the component. Pass in config object with the values you want to change.
```shell
@Input() config = {
    placeholderText: 'Search...',
    minSearchLength: 3,
    searchLengthError: 'Search term must be at least 3 characters',
    debounceTime: 500
  };
```

## Outputs
(searchInputChanged) -> Fired when the search term is changed and greater than the specified length and not the same as the last emitted value or if the search term is empty.

## Example
```shell
<ngc-search-input [config]="configSettings"></ngc-search-input>
```

![Search Input](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/searchinput.png)

# Adding components to the library
- Run the following command
```shell
ng g library search-input --prefix ngc
```
- Change to the directory and init NPM
```shell
npm init
```
- Add commands to package.json and show the library in the sample app