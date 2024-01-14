import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { getTimeAgo } from 'src/app/utils/date';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;

  getTimeAgo = getTimeAgo;
}
