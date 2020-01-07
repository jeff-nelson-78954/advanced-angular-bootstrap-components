import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrollingTabsModule } from 'scrolling-tabs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScrollingTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
