import Quote from './Quote';
import User from './User';

export default interface Post {
  author: User;
  createdAt: number;
  createdBy: User;
  id: string;
  text: string;
  type: string;
  quote?: Quote;
}
