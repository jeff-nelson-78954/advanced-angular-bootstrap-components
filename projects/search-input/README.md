# Search Input
This component is a search input field built on Angular 8 and Bootstrap 4. 
 It listens for input pauses for a set duration (default 500 ms), checks for unique values, and then emits the text in the search field.
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
- [config] -> Used to set multiple settings for the component.
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
<ngc-search-input></ngc-search-input>
```

![Search Input](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/searchinput.png)