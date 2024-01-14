import { Component, Input } from '@angular/core';
import { PostWithComments } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: PostWithComments;
}
