
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserdataService } from '../userdata.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public ref:MatDialogRef<ConfirmationDialogComponent>,
  private toastr: ToastrService,
  private _userService:UserdataService ){
   ref.disableClose = true;
   console.log(this.data.hide)
 }
// 
//  row:any =this.data.id;
     hide:any = this.data.hide;
    //title: null | string | undefined
    title:any=this.data.data.firstname;
 // this.ref.close(true);
    //this.http.delete<any>("http://localhost:3000/registerUser/"+this.row)
    
    confirm(){
         this.ref.close(true);
    // this._userService.deleteUser(this.row).subscribe({
    //   next: res => {
    //     //alert(this.title+" user is Deleted !! ")
    //     this.toastr.success(this.title+" Deleted Successfully !! ", 'Delete Message!');
    //    
    //   },
    //   error:console.error
    
    // })
}
 
}
