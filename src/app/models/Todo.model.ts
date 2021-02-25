import { User } from './user.model';
export interface Todo {
  id?: any;
  title: string;
  description: string;
  status?: boolean;
  owner?: User[];
}
