import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from 'models/User';
import followersService from 'services/followers.service';
import usersService from 'services/users.service';
import { RootState } from 'store/store';

export interface userState {
  user: User;
  setPostsAmount: number;
}
const initialState: userState = {
  user: {},
  setPostsAmount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setPostsAmount: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser, setPostsAmount } = userSlice.actions;

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

export const getUserLoggedIn = createAsyncThunk(
  'user/getUserLoggedIn',
  async (): Promise<User> => {
    const user = await usersService.getUserLoggedIn();

    return user;
  }
);

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId: string): Promise<User> => {
    const user = await usersService.getUserById(userId);
    return user;
  }
);
export const selectedUser = (state: RootState): User => state.user.user;

export default userSlice.reducer;
