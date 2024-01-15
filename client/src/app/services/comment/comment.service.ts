import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.apiUrl}/api/comments/post/${postId}`
    );
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/api/comments`, comment, {
      withCredentials: true,
    });
  }
}
