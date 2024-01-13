import { Post } from './post.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

export interface UserWithPosts extends User {
  posts: Post[];
}
