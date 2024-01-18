import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;
  formattedDate!: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the ID from the URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.userService.getUserById(id).subscribe((user) => {
          this.user = user;
        });
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  formatDate() {
    const date = new Date(this.user.createdAt);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}
