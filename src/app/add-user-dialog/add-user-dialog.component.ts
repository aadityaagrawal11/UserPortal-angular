import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserdataService } from '../userdata.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {
  inputdata: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private _userService: UserdataService,
  public ref: MatDialogRef<AddUserDialogComponent>, 
  private toastr: ToastrService,
    ){
    ref.disableClose = true;
  }

  ngOnInit(): void {
    this.inputdata = this.data;
  }
  hide=true;
  today = new Date();
  AddUserForm = new FormGroup({

    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
    picker: new FormControl('', [Validators.required]),
    //timepicker: new FormControl('', [Validators.required]),
  });

  addUser(AddUserForm: FormGroup) {
    console.log(this.AddUserForm);
    console.log(this.AddUserForm.value);
    console.log(this.AddUserForm.valid);
     this._userService.postRegisterUser(this.AddUserForm.value).subscribe({
        next: (val: any) => {
          //alert("User Added Successfull");
           
          this.toastr.success(val.firstname + " user Added to the portal !! ", 'Success Message!');
          this.AddUserForm.reset();
          this.ref.close(true);
        },
        error: console.log
      })
  }
}





