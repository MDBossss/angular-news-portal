import { User } from './user.model';

export interface Comment {
  id: string;
  content: string;
  User: User;
  createdAt: Date;
  updatedAt: Date;
}
