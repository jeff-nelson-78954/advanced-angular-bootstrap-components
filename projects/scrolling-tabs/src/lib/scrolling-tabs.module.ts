import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingTabDirective } from './scrolling-tab.directive';
import { ScrollingTabsComponent } from './scrolling-tabs.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ScrollingTabsComponent, ScrollingTabDirective],
    exports: [ScrollingTabsComponent, ScrollingTabDirective ]
})
export class ScrollingTabsModule { }
