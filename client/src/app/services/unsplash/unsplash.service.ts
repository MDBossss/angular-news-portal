import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import UnsplashResponse from 'src/app/models/unsplash-response.model';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  private unsplashClientId = environment.unsplashClientId;

  constructor(private http: HttpClient) {}

  generateUnsplashImage(query: string) {
    return this.http.get<UnsplashResponse>(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${this.unsplashClientId}&per_page=1`
    );
  }
}
