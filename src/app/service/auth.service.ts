import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    this.checkAuthStatus();
  }

  loggedIn: boolean = false;

  private checkAuthStatus(): void {
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.loggedIn = (isLoggedIn);
    } catch (error) { console.error("Local Storage not Defined") }
  }
  login() {
    try {
      localStorage.setItem('isLoggedIn', 'true');
      this.loggedIn = true;
    } catch (error) { console.error("Local Storage not Defined") }
  }
  logout() {
    try {
      localStorage.setItem('isLoggedIn', 'false');
      this.loggedIn = false;
    } catch (error) { console.error("Local Storage not Defined") }
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

}




