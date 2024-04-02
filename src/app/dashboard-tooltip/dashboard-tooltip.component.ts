import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard-tooltip',
  templateUrl: './dashboard-tooltip.component.html',
  styleUrl: './dashboard-tooltip.component.css'
})
export class DashboardTooltipComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;

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
}
