import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TestComponent } from '../Ag grid Dashboard/test.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent implements ICellRendererAngularComp {
  
  constructor(private deleteDialog: MatDialog, 
    private editDialog: MatDialog, private toastr: ToastrService,
    private _userService:UserdataService ,
    private ag: TestComponent) { }
  
  params!: ICellRendererParams;
  agInit(params: ICellRendererParams): void {
    //console.log(params)
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  isDeleteButtonDisabled: boolean = this.ag.gridApi.getSelectedRows().length === 0;
  
  editpopup() {
     const userData = this.params.data;
     console.log(userData);
    const editref = this.editDialog.open(EditDialogComponent, {
      width: '25%',
      data: userData
    });
    editref.afterClosed().subscribe({
      next: (val) => {
        if (val) this.ag.getUserList();
      }

    })
  }

 

    //console.log(this.params.data);
    //this.params.api.applyTransaction({ remove: [this.params.data] });
    deletepopup() {
    const deleteref = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '39%',
      data: {
        data: this.params.data,
        hide:false
      }
    });
    deleteref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          const row = this.params.data.id;
          const title = this.params.data.firstname;
          this._userService.deleteUser(row).subscribe({
      next: res => {
        //alert(this.title+" user is Deleted !! ")
        this.toastr.success(title+" Deleted Successfully !! ", 'Delete Message!');
        this.ag.getUserList();
      },
      error:console.error
            
        })}
     
      }
    })
  }


}
