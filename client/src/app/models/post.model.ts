import { Category } from './category.model';
import { User } from './user.model';
import { Comment } from './comment.model';

export interface Post {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  author: User;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}
