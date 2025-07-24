import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [DatePipe]
})
export class InvestigacionModule { }
