import { Component } from '@angular/core';
import { PostWithComments } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts: PostWithComments[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
