import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule
  ],
  styleUrls: ['./auth-signin.component.scss']
})

export class AuthSigninComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Sending payload:', { email, password }); // Log the payload
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          // Assuming the response contains the user's role
          // const role = response.roles[0]; // Assuming roles is an array and we take the first role
          // this.redirectBasedOnRole(role);

          const roles: string [] = response.roles;
          this.redirectBasedOnRole(roles);

        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }

  redirectBasedOnRole(roles: string []) {
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/admin/dashboard']);
    } else if (roles.includes('ROLE_FARMER')) {
      this.router.navigate(['/farmer/dashboard']);
    } else if (roles.includes('ROLE_BUYER')) {
      this.router.navigate(['/buyer/dashboard']);
    } else {
      this.router.navigate(['/auth/signin']);
    }
  }

  // redirectBasedOnRole(role: string) {
  //   switch (role) {
  //     case 'ROLE_ADMIN':
  //       this.router.navigate(['/admin/dashboard']);
  //       break;
  //     case 'ROLE_FARMER':
  //       this.router.navigate(['/farmer/dashboard']);
  //       break;
  //     case 'ROLE_BUYER':
  //       this.router.navigate(['/buyer/dashboard']);
  //       break;
  //     default:
  //       this.router.navigate(['/']);
  //   }
  // }
}
