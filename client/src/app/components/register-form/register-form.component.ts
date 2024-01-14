import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  user!: User;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required, Validators.min(3)]),
    lastName: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  constructor(private authService: AuthService, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) router.navigate(['/']);
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  onSubmit() {
    this.authService
      .register(
        this.registerForm.value.email!,
        this.registerForm.value.password!,
        this.registerForm.value.firstName!,
        this.registerForm.value.lastName!
      )
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Register error', error);
        }
      );
  }

  handleNavigateLogin() {
    this.router.navigate(['/login']);
  }
}
