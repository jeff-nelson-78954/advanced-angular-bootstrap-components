# Pager
This component is a responsive pager component build on Angular 8 and Bootstrap 4. 
 It keeps track of the total records and number of pages based on page size. It fires a event 
 when the user changes the page or page size.

## Getting started
- Install the package 
```shell
npm install ngc-pager
```
- Add import to your Angular Module 
```shell
import { PagerModule } from 'ngc-pager';
```

## Inputs
- [pageinationMetaData] -> Object used to hold and pass page data. Object and default values below.
```shell
class PaginationMetadata {
    constructor(public currentPage: number = 1, public totalPages: number = 0, public pageSize: number = 25,
                public totalCount: number = 0, public hasPrevious: boolean = false, public hasNext: boolean = false) {
    }
}
```
- [floatRight] -> Will push the component to the right on larger screens. Default: false
- [resultsHeader] -> Sets the text that will be shown in front of the result count. Default: 'Total Results:'
- [pageSizes] -> A array of integers that will be used to generate the available list of page sizes. Default [5, 10, 25, 50, 100]


## Outputs
(pagerChanged) -> Fired when page or pagesize changes.

## Example
```shell
<ngc-pager  [pageinationMetaData]="pageinationMetaData"
            [floatRight]="true"
            [resultsHeader]="'Total:'"
            [pageSizes]="pageSizeArray"
            (pagerChanged)="onPagerChanged">
</ngc-pager>
```

![Pager](https://raw.githubusercontent.com/jeff-nelson-78954/advanced-angular-bootstrap-components/master/assets/pager.png)