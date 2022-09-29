import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Filtro from 'models/Filtro';

import followersService from 'services/followers.service';
import { RootState } from 'store/store';

export interface followersuserState {
  isLoggedInUserFollowing: boolean;
}

const initialState = {
  isLoggedInUserFollowing: false,
};

export const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
    setSelectedPostToQuote: (state, { payload }) => {
      state.isLoggedInUserFollowing = payload;
    },
  },
});

export const { setSelectedPostToQuote } = followersSlice.actions;

export const followOrUnfollowUser = createAsyncThunk(
  'followers/followOrUnfollowUser',
  async (
    { userId, userToGetInfoId, isFollowing }: Filtro,
    thunkAPI
  ): Promise<any> => {
    if (isFollowing) {
      await followersService.unfollow(userId!, userToGetInfoId).then(() => {
        return thunkAPI.dispatch(setSelectedPostToQuote(false));
      });
    } else {
      await followersService.follow(userId!, userToGetInfoId).then(() => {
        return thunkAPI.dispatch(setSelectedPostToQuote(true));
      });
    }
  }
);

export const getWhoUserFollows = createAsyncThunk(
  'followers/getWhoUserFollows',
  async (userId: string): Promise<any> => {
    const followers = await followersService.getFollowers();

    const userFollows = followers.filter(
      (follower: any) => follower.followerUserId === userId
    );

    return userFollows;
  }
);

export const verifyIfIsLoggedInUserFollowing = createAsyncThunk(
  'followers/verifyIfIsLoggedInUserFollowing',
  async ({ userId, userToGetInfoId }: Filtro): Promise<any> => {
    const isFollowing = await followersService.isFollowing(
      userId!,
      userToGetInfoId
    );

    return Boolean(isFollowing.length);
  }
);

export const getUserFollowers = createAsyncThunk(
  'followers/getUserFollowers',
  async (userId: any): Promise<any> => {
    const userFollowers = await followersService.getUserFollowers(userId!);

    return userFollowers;
  }
);
export const selectedFollower = (state: RootState): any =>
  state.followers.isLoggedInUserFollowing;

export default followersSlice.reducer;
