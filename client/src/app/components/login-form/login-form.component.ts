import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  user!: User;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) router.navigate(['/']);
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
          const user = (response.body as any).user;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
          this.authService.setCurrentUser(user);
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
