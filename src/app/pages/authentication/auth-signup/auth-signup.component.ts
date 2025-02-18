import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-auth-signup',
  standalone: true,
  templateUrl: './auth-signup.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      address: ['', Validators.required],
      userType: ['', Validators.required]
      // roles: [[], Validators.required]
    });
  }

  onSubmit() {
    console.log('Form Valid:', this.signupForm.valid);
    console.log('Form Errors:', this.signupForm.errors);
    console.log('Form Value:', this.signupForm.value);
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      // formValue.roles = [formValue.userType]; // Assuming userType maps directly to roles
      if (formValue.userType === 'FARMER') {
        formValue.roles = ['ROLE_FARMER'];
      } else if (formValue.userType === 'BUYER') {
        formValue.roles = ['ROLE_BUYER'];
      }
      this.authService.register(formValue).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/auth/signin']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }
}
