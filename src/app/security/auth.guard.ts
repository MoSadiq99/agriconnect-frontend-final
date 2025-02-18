import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthenticationService, // Inject your authentication service
    private readonly router: Router // Inject the Router for navigation
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    // _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRoles = route.data['roles'] as string[]; // Expected roles from route data
    const userRoles = this.authService.getCurrentUserRoles(); // Get user roles from the auth service

    if (this.isAuthorized(userRoles, expectedRoles)) {
      return true; // Allow access if the user has the required role(s)
    }

    this.redirectToLogin(); // Redirect if unauthorized
    return false;
  }

  private isAuthorized(userRoles: string[] | undefined, expectedRoles: string[]): boolean {
    return !!userRoles?.some(role => expectedRoles.includes(role));
  }

  private redirectToLogin(): void {
    this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: this.router.url } }); // Preserve return URL
  }
}

