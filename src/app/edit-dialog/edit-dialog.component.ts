import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<EditDialogComponent>,
    private _userService: UserdataService, 
    private toastr: ToastrService){
    ref.disableClose = true;
  }


  ngOnInit(): void {
    console.log(this.data.id);
  }


  today = new Date();
  editForm = new FormGroup({

    firstname: new FormControl(this.data.firstname, [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl(this.data.lastname, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(this.data.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(this.data.password, [Validators.required]),
    picker: new FormControl(this.data.picker, [Validators.required]),
    //timepicker: new FormControl(this.data.timepicker, [Validators.required]),
  });

  editSubmission() {
    //this.http.patch<any>("http://localhost:3000/registerUser/" + this.data.id, this.editForm.value)
    console.log(this.editForm.value);
    console.log(this.editForm.valid)
    this._userService.updateUser(this.data.id, this.editForm.value).subscribe({
      next: (res) => {
        this.toastr.success(this.editForm.value.firstname + " user modified Successfully !! ", 'Success Message!');
        this.editForm.reset();
        this.ref.close(true);
      },
      error: console.log
    });
  }

}
