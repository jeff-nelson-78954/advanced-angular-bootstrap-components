import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { ScrollingTabsComponent } from './scrolling-tabs.component';


@Directive({
    selector: '[ngcScrollingTab], ngcScrollingTab'
})
export class ScrollingTabDirective implements OnInit, OnDestroy {
    @Input() id: string;
    @Input() title: string;

    @HostBinding('class.active')
    @Input() active = false;

    constructor(private tabs: ScrollingTabsComponent, private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.tabs.addTab(this);
        this.renderer.addClass(this.elementRef.nativeElement, 'tab-pane');
        this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'tabpanel');
    }

    ngOnDestroy(): void {
        this.tabs.removeTab(this);
    }

    getTabClasses() {
        return {
            'nav-link': true,
            active: this.active
        };
    }
}
