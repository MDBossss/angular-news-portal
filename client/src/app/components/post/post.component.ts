import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostWithComments } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post!: PostWithComments;
  user!: User;

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  get comment() {
    return this.commentForm.get('comment');
  }

  ngOnInit() {
    // get current user to post with comments
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });

    // Get the ID from the URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.postService.getPostById(id).subscribe((post) => {
          this.post = post;
        });
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const commentValue = this.comment?.value!;

      const comment: Comment = {
        author: this.user,
        content: commentValue,
        postId: this.post.id!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.commentService.createComment(comment).subscribe(
        (createdComment) => {
          this.post.comments.push(createdComment);
          this.commentForm.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
