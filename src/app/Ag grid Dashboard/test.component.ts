import { Component, Inject, Input, LOCALE_ID, OnInit, SimpleChanges } from '@angular/core';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { UserdataService } from '../userdata.service';
import { formatDate } from '@angular/common';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { forkJoin } from 'rxjs';
import { DashboardTooltipComponent } from '../dashboard-tooltip/dashboard-tooltip.component';
import { DatePipe } from '@angular/common';
import { DatecustomComponent } from '../datecustom/datecustom.component';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) private locale: string,
    private _userService: UserdataService,
    private deleteDialog: MatDialog,
    private _authService: AuthService,
    private toastr: ToastrService,
    private addDialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  themeClass = "ag-theme-quartz";
  registerUserArr: any = [];
  public gridApi: any;
  public gridColumnApi: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  rowData = 'multiple';
  pagination = true;
  paginationPageSize = 3;
  paginationPageSizeSelector = [3, 6, 9];
  isDeleteButtonDisabled: boolean = true;

  ngOnInit(): void {
    this.getUserList();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      headerName: "First Name", field: "firstname", headerCheckboxSelection: true,
      checkboxSelection: true, cellStyle: { fontWeight: 'bold' }, cellRenderer: DashboardTooltipComponent
    },
    { headerName: "Last Name", field: "lastname", cellRenderer: DashboardTooltipComponent },
    { headerName: "Email ID", field: "email", cellRenderer: DashboardTooltipComponent },
    { headerName: "Password", field: "password", cellRenderer: DashboardTooltipComponent },
    {
      headerName: "Date of Birth", field: "picker",
      cellRenderer: DatecustomComponent
    },
    { headerName: "Action", field: "action", cellRenderer: ActionButtonComponent, width: 235, autoHeight: true }
  ];
  dateValueFormatter(params: any): string {
    console.log(params.value);
    return params.value.toISOString().split('T')[0];
    // const date = new Date(params.value);
    // return this.datePipe.transform(date, 'yyyy-MM-dd');
    //return formatDate(params.value, 'd MMM yyyy', this.locale); 
  }
  //(data: any) => { return formatDate(data.value, 'd MMM yyyy', this.locale); }
  // Defines sorting and filtering to all the columns.
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,

  }

  Filterchange(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    //this.gridApi.setQuickFilter(val);
    this.gridApi.setGridOption('quickFilterText', val);
  }


  onGridReady(params: any) {
    //console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this._userService.getAllRegisterUser().subscribe({
      next: res => {
        //params.api.setRowData(res);
        params.api.setGridOption('rowData', res);
        this.registerUserArr = res;
      },
      error: console.log
    })
  }

  addpopup() {
    const addref = this.addDialog.open(AddUserDialogComponent, {
      width: '25%'

    });
    addref.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getUserList();
      }
    })
  }

  deletepopup() {
    const deleteref = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '39%',
      data: {
        data: this.selectedUserIds,
        hide: true
      }
    });
    deleteref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          const deleteRequests = this.selectedUserIds.map((ele: any) => this._userService.deleteUser(ele));
          forkJoin(deleteRequests).subscribe(
            res => {
              this.getUserList();
            });
          this.toastr.success(" User deleted successfully !! ", 'Delete Message!');
        }
      }

    })
  }

  selectedUserIds: any;
  deleteSelectedRows() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.selectedUserIds = selectedNodes.map((node: any) => node.data.id);
    this.deletepopup();

  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.isDeleteButtonDisabled = selectedRows.length === 0; // Disable delete button if no rows are selected
  }

  getUserList() {

    this._userService.getAllRegisterUser().subscribe({
      next: res => {
        this.registerUserArr = res;
      },
      error: console.log
    })
  }

}
