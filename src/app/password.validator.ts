import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl):{ [key:string]:boolean } | null{
    const password = control.get("password"); // get password from our password form control
    const confirmPassword = control.get("confirmPassword"); // get password from our confirmPassword form control
    
    if(password?.pristine || confirmPassword?.pristine)return null;
    return password && confirmPassword && password.value !== confirmPassword.value ?
    { 'misMatch' : true} : null;
    
     
    }
  