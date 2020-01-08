import { TestBed, async } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ScrollingTabsComponent } from './scrolling-tabs.component';
import { ScrollingTabDirective } from './scrolling-tab.directive';


describe('ScrollingTabsComponent', () => {
    let directive: ScrollingTabDirective;
    let mockComponent: ScrollingTabsComponent | any;
    let mockElementRef: ElementRef | any;
    let mockRenderer: Renderer2 | any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ScrollingTabsComponent, ScrollingTabDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        mockComponent = jasmine.createSpyObj('ScrollingTabsComponent', ['addTab', 'removeTab']);
        mockElementRef = { nativeElement: { } };
        mockRenderer = jasmine.createSpyObj('Renderer2', ['addClass', 'setAttribute']);

        directive = new ScrollingTabDirective(mockComponent, mockElementRef, mockRenderer);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should handle ngOnInit', () => {
        directive.ngOnInit();

        expect(mockComponent.addTab).toHaveBeenCalledWith(directive);
        expect(mockRenderer.addClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'tab-pane');
        expect(mockRenderer.setAttribute).toHaveBeenCalledWith(mockElementRef.nativeElement, 'role', 'tabpanel');
    });

    it('should handle ngOnDestroy', () => {
        directive.ngOnDestroy();

        expect(mockComponent.removeTab).toHaveBeenCalledWith(directive);
    });

    it('should handle getTabClasses', () => {
        directive.active = false;
        const expectedResult = {
            'nav-link': true,
            active: false
        };

        const result = directive.getTabClasses();

        expect(result).toEqual(expectedResult);
    });

});
