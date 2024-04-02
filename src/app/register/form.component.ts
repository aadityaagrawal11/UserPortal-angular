import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../password.validator';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {


  constructor(private router: Router, 
    private user:UserdataService,
    private toastr: ToastrService,
   ) {}
  
  registerForm = new FormGroup({

    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    picker: new FormControl(''),
   // timepicker: new FormControl('', [Validators.required][Validators.required]),
  }, { validators: PasswordValidator }
  )

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

   today = new Date();
   h = this.today.getHours(); 
   m = this.today.getMinutes(); 
   currentTime = `${this.h}:${this.m}` ;
  
  submit(registerForm: FormGroup) {
     
    // this.http.post<any>("http://localhost:3000/registerUser",this.registerForm.value)
    this.user.postRegisterUser(this.registerForm.value).subscribe({
      next: res =>{
        //alert("Registration Successfull");
        this.toastr.success(this.registerForm.value.firstname + " user Added to the portal !! ", 'Success Message!');
        this.registerForm.reset();
        this.router.navigate(['/login']);
        },
      error:console.log,
    } 
    )}
   
    
  
  }



// const localUser = localStorage.getItem('registerUser')
// if (localUser != null) {
//   const users = JSON.parse(localUser);
//   users.push(this.registerForm.value);
//   localStorage.setItem('registerUser', JSON.stringify(users));
// }
// else {
//   const users = [];
//   users.push(this.registerForm.value);
//   localStorage.setItem('registerUser', JSON.stringify(users));
// }