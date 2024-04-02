import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-datecustom',
  templateUrl: './datecustom.component.html',
  styleUrl: './datecustom.component.css'
})
export class DatecustomComponent implements ICellRendererAngularComp{
  params!: ICellRendererParams;
  constructor(@Inject(LOCALE_ID) private locale: string){}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    throw true
  }
  getTooltip(): string {
    // Implement tooltip logic here based on cell value or other data
    return `Details: ${this.params.value}`; // Example: showing cell value as tooltip
  }

  getDate(){
    return formatDate(this.params.value, 'd MMM yyyy', this.locale)
  }

// //(params: any) => {
//  
}