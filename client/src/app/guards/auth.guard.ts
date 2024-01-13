import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      tap((user) => {
        console.log(user);
        if (!user) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  // canActivate(): Observable<boolean> {
  //   const user = this.authService.getCurrentUser();
  //   console.log(user);
  //   if (user) {
  //     return of(true);
  //   } else {
  //     this.router.navigate(['/login']);
  //     return of(false);
  //   }
  // }
}
