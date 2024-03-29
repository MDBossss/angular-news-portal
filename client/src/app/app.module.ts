import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth/auth.service';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserImageComponent } from './components/user-image/user-image.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

export function initializeApp(authService: AuthService) {
  return () => authService.getProfile().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    RegisterFormComponent,
    NavbarComponent,
    UserPostsComponent,
    ProfileComponent,
    AdminComponent,
    PostComponent,
    CommentComponent,
    UserImageComponent,
    CreatePostComponent,
    PostPreviewComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
