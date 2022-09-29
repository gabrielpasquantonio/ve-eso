import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import followersSlice from './followers/followers.slice';
import postsSlice from './posts/posts.slice';
import toasterSlice from './toaster/toaster.slice';
import userSlice from './user/user.slice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
    followers: followersSlice,
    toaster: toasterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
