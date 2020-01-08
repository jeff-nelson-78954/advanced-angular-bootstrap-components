import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Subscription } from 'rxjs';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle ngAfterViewInit', () => {
    const spy = spyOn(component, 'listenForSearch');

    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should handle ngOnDestroy', () => {
    component.searchSubscription = new Subscription();
    const spy = spyOn(component.searchSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('should handle listenForSearch() with long enough word', fakeAsync(() => {
    const spy = spyOn(component.searchInputChanged, 'emit');
    component.smallSearchTermError = true;
    component.txtSearchInput.nativeElement.value = '123456';
    component.txtSearchInput.nativeElement.dispatchEvent(new Event('keyup'));

    tick(500);
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.smallSearchTermError).toBeFalsy();
      expect(spy).toHaveBeenCalled();
    });
  }));

  it('should handle listenForSearch() no text', fakeAsync(() => {
    const spy = spyOn(component.searchInputChanged, 'emit');
    component.smallSearchTermError = true;
    component.txtSearchInput.nativeElement.value = '';
    component.txtSearchInput.nativeElement.dispatchEvent(new Event('keyup'));

    tick(500);
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.smallSearchTermError).toBeFalsy();
      expect(spy).toHaveBeenCalled();
    });
  }));

  it('should handle listenForSearch() with short word', fakeAsync(() => {
    const spy = spyOn(component.searchInputChanged, 'emit');
    component.smallSearchTermError = false;
    component.txtSearchInput.nativeElement.value = '1';
    component.txtSearchInput.nativeElement.dispatchEvent(new Event('keyup'));

    tick(500);
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.smallSearchTermError).toBeTruthy();
      expect(spy).not.toHaveBeenCalled();
    });
  }));
});
