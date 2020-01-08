import { NgModule } from '@angular/core';
import { SearchInputComponent } from './search-input.component';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [CommonModule],
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent]
})
export class SearchInputModule { }
