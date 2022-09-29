/* eslint-disable class-methods-use-this */

import { localStorageKeys } from 'models/enums/localStorageKeys';
import Post from 'models/Post';

import LocalStorageService from './localStorage.service';

class PostsService {
  constructor() {
    console.log('aqui');
  }

  createPost = (key: any, posts: Post[]): void => {
    LocalStorageService.salvar(key, posts);
  };

  getAllPosts = (): Post[] => {
    const posts = LocalStorageService.obter(localStorageKeys.POSTS);

    return posts;
  };
}
export default new PostsService();
