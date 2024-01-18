import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  user!: User;
  categories!: Category[];

  categoryForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  get title() {
    return this.categoryForm.get('title');
  }

  get description() {
    return this.categoryForm.get('description');
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (!user.isAdmin) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    });
  }

  onSubmit() {
    this.categoryService
      .createCategory({
        id: '',
        title: this.categoryForm.value.title!,
        description: this.categoryForm.value.description!,
      })
      .subscribe((category) => {
        this.categories.push(category);
        this.categoryForm.reset();
      });
  }
}
