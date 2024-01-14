import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { PostService } from 'src/app/services/post/post.service';
import { UnsplashService } from 'src/app/services/unsplash/unsplash.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  categories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  imageUrl!: string;
  user!: User;

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(3)]),
    content: new FormControl('', [Validators.required, Validators.min(50)]),
    category: new FormControl(null, [Validators.required]),
  });

  constructor(
    private categoryService: CategoryService,
    private unsplashService: UnsplashService,
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) {}

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  get category() {
    return this.postForm.get('category');
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  onRadioChange(category: Category): void {
    this.selectedCategory = category;
  }

  onSubmit() {
    if (this.postForm.valid) {
      const title = this.title?.value!;

      this.unsplashService.generateUnsplashImage(title).subscribe(
        (unsplashResponse) => {
          this.imageUrl = unsplashResponse.results[0].urls.regular;
          console.log(unsplashResponse.results[0].urls.regular);

          if (this.imageUrl) {
            const post: Post = {
              title: title,
              content: this.content?.value!,
              category: this.category?.value!,
              imageUrl: this.imageUrl,
              author: this.user,
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            this.postService.createPost(post).subscribe(
              (createdPost) => {
                this.router.navigate(['/']);
              },
              (error) => {
                console.error(error);
              }
            );
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
