import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getCurrentUser()) this.router.navigate(['/']);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe(
        (response) => {
          this.authService.setCurrentUser((response as any).user);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login error', error);
        }
      );
  }

  handleNavigateRegister() {
    this.router.navigate(['/register']);
  }
}
