import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
type ResponseObserveType = 'response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getProfile().subscribe((user) => {
      this.setCurrentUser(user);
    }),
      (error: any) => {
        console.error('Error fetching profile: ', error);
      };
  }

  login(email: string, password: string) {
    let loginHttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as ResponseObserveType,
    };

    const body = { email, password };

    return this.http.post(
      `${this.apiUrl}/api/auth/login`,
      body,
      loginHttpOptions
    );
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const body = {
      email,
      password,
      firstName,
      lastName,
    };
    return this.http.post(`${this.apiUrl}/api/auth/register`, body, {
      observe: 'response',
    });
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    return this.http.get(`${environment.apiUrl}/api/auth/logout`, {
      withCredentials: true,
    });
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user.body);
  }

  getCurrentUser() {
    return this.currentUserSubject;
  }

  private getProfile() {
    return this.http
      .get(`${environment.apiUrl}/api/auth/current`, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        tap(
          (response) => this.setCurrentUser(response.body),
          (error) => {
            // Handle errors or set the current user to null if no valid token is found
            console.error('Error fetching user profile:', error);
            this.setCurrentUser(null);
          }
        )
      );
  }
}
