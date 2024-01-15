import { User } from './user.model';

export interface Comment {
  id?: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}
