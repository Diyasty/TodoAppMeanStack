import { User } from './user.model';
export interface Todo {
  id?: number;
  title: string;
  description: string;
  status?: boolean;
  owner?: User[];
}
