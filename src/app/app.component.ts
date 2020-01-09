import { Component } from '@angular/core';
import { PaginationMetadata } from 'pager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'advanced-angular-bootstrap-components';
  configSettings = { placeholderText: 'Search Me' };
  pageinationMetaData = new PaginationMetadata();
}
