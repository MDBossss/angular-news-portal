import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Post, PostWithComments } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<PostWithComments[]> {
    return this.http.get<PostWithComments[]>(`${this.apiUrl}/api/posts`);
  }

  getPostById(id: string): Observable<PostWithComments> {
    return this.http.get<PostWithComments>(`${this.apiUrl}/api/posts/${id}`);
  }

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/posts/user/${userId}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/api/posts`, post, {
      withCredentials: true,
    });
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/api/posts/${id}`, post, {
      withCredentials: true,
    });
  }

  deletePost(id: string) {
    return this.http.delete(`${this.apiUrl}/api/posts/${id}`, {
      withCredentials: true,
    });
  }
}
