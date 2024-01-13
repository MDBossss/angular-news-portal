import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log(this.authService.getCurrentUser())
    if (this.authService.getCurrentUser() !== null) {
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
