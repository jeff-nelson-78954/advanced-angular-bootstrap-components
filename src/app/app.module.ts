import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ScrollingTabsModule } from 'scrolling-tabs';
import { SearchInputModule } from 'search-input';
import { PagerModule } from 'pager';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScrollingTabsModule,
    SearchInputModule,
    PagerModule,
    RouterModule.forRoot([])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
