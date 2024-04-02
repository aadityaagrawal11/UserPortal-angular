import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../userdata.service';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router,
    private _userService:UserdataService,
    private _authService: AuthService,
    private toastr: ToastrService)
     {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
  })

   hide = true;
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }



  submit(loginForm : FormGroup) {
    
    //this.http.get<any>("http://localhost:3000/registerUser")
    this._userService.getAllRegisterUser().subscribe({
      next: res =>{
      const users = res.find((user:any) =>{
        return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password;
      });
      if(users){
        //console.log(users)
        this.toastr.success(users.firstname + " user login Successfully !! ", 'Success Message!');
        this.loginForm.reset();
        this._authService.login();
        this.router.navigate(['/dashboard']);

      }
      else{
        //alert("Invalid credientails. Try Again !!")
        this.toastr.error("Invalid credientails. Try Again !!", 'Error Message!');
      }
    },
    error:console.log,
  })
}

}

    // const localUser = localStorage.getItem('registerUser')
    // if (localUser != null) {
    //   console.log(localUser);
    //   const users = JSON.parse(localUser);
    //   console.log(users);
    //   const isUserPresent = users.find((user: { email: string | null | undefined; password: string | null | undefined; }) => user.email == this.loginForm.value.email
    //     && user.password === this.loginForm.value.password);

    //   if (isUserPresent != undefined) {
    //     console.log(isUserPresent);
    //     alert("User Successfully LoggedIn!!");
    //     localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
    //   }
    //   else {
      
    //     alert("Invalid Credientails..Try Again!!");
    //   }
    // }

 