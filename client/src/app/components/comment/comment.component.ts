import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<string>();

  isEditing: boolean = false;
  editedComment: string = '';
  currentUser!: User;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );

    this.editedComment = this.comment.content;
  }

  handleEdit() {
    const newComment: Comment = {
      ...this.comment,
      content: this.editedComment,
      updatedAt: new Date(),
    };
    this.commentService.updateComment(newComment).subscribe(() => {
      this.isEditing = false;
      this.comment.content = this.editedComment;
    });
  }

  handleDelete() {
    this.commentService.deleteComment(this.comment.id!).subscribe(() => {
      this.deleteComment.emit(this.comment.id!);
    });
  }
}
