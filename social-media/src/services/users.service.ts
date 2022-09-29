/* eslint-disable class-methods-use-this */

import { localStorageKeys } from 'models/enums/localStorageKeys';
import User from 'models/User';

import LocalStorageService from './localStorage.service';

class UsersService {
  constructor() {
    console.log('aqui');
  }

  getUserById = (id: string): User => {
    const users = LocalStorageService.obter(localStorageKeys.USERS);
    const user = users.find((allUsers: User) => allUsers.id === id);
    return user;
  };

  getUserLoggedIn = (): User => {
    const loggedUser = {
      id: '797f6ce2-9f14-4c46-bf5e-05d446b34c84',
      name: 'Lucas Polizeli',
      createdAt: 1652063207108,
      username: 'lucas',
    };

    return loggedUser;
  };
}
export default new UsersService();
