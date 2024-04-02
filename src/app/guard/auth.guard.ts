import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    //Check if user is logged in
    if (this.authService.isAuthenticated()) {
      return true; // Allow access to the route
    }
    else {
      // if (this.router.url !== '/login') {
      //   this.router.navigate(['/login']);
      // }
      return false;
    }

  }
}
