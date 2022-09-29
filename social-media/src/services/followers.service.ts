/* eslint-disable class-methods-use-this */

import { localStorageKeys } from 'models/enums/localStorageKeys';

import LocalStorageService from './localStorage.service';

class FollowersService {
  constructor() {
    console.log('aqui');
  }

  getFollowers = (): any => {
    const followers = LocalStorageService.obter(localStorageKeys.FOLLOWERS);

    return followers;
  };

  unfollow = (followerUserId: string, userIdToUnfollow: any): any => {
    const followers = LocalStorageService.obter(localStorageKeys.FOLLOWERS);
    const followersWithoutUnfollowedUser = followers.filter(
      (followerUser: any) =>
        followerUser.followerUserId !== followerUserId &&
        followerUser.followingUserId !== userIdToUnfollow
    );

    LocalStorageService.salvar(
      localStorageKeys.FOLLOWERS,
      followersWithoutUnfollowedUser
    );
  };

  follow = (followerUserId: string, userIdToFollow: any): any => {
    const followers = LocalStorageService.obter(localStorageKeys.FOLLOWERS);

    const followersWithNewFollower = [
      { followerUserId, followingUserId: userIdToFollow },
      ...followers,
    ];

    LocalStorageService.salvar(
      localStorageKeys.FOLLOWERS,
      followersWithNewFollower
    );
  };

  isFollowing = (followerUserId: string, userIdToCheck: any): any => {
    const followers = LocalStorageService.obter(localStorageKeys.FOLLOWERS);

    const isFollowing = followers.filter(
      (follower: any) =>
        follower.followerUserId === followerUserId &&
        follower.followingUserId === userIdToCheck
    );

    return isFollowing;
  };

  getUserFollowers = (userId: string): any => {
    const followers = LocalStorageService.obter(localStorageKeys.FOLLOWERS);

    const userFollowers = followers.filter(
      (follower: any) => follower.followingUserId === userId
    );

    return userFollowers;
  };
}
export default new FollowersService();
