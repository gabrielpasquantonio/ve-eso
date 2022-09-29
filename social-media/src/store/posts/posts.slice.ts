import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ManipulationHelper } from 'helpers/manipulation.helper';
import ToastHelper from 'helpers/toast.helper';
import { localStorageKeys } from 'models/enums/localStorageKeys';
import { postType } from 'models/enums/postTypes';
import Filtro from 'models/Filtro';
import Post from 'models/Post';
import { toast } from 'react-toastify';
import postsService from 'services/posts.service';
import usersService from 'services/users.service';
import { RootState } from 'store/store';
import { v4 as uuidv4 } from 'uuid';

export interface postsState {
  postToQuote: Post | undefined;
  posts: Post[];
  updatePost: boolean;
  isAbleToPost: boolean;
}

const initialState: postsState = {
  postToQuote: undefined,
  posts: [],
  updatePost: false,
  isAbleToPost: true,
};

export const postsSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSelectedPostToQuote: (state, { payload }) => {
      state.postToQuote = payload;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setUpdatePost: (state, { payload }) => {
      state.updatePost = payload;
    },
    setIsAbleToPost: (state, { payload }) => {
      state.isAbleToPost = payload;
    },
  },
});
export const {
  setSelectedPostToQuote,
  setPosts,
  setUpdatePost,
  setIsAbleToPost,
} = postsSlice.actions;
export const isUserAbleToPost = createAsyncThunk(
  'posts/isUserAbleToPost',
  async (userId: string, thunkAPI): Promise<any> => {
    const postsByUser = await postsService.getAllPosts();
    const postsByUserId = postsByUser.filter(
      (userPosts: Post) => userPosts.createdBy.id === userId
    );

    const currentDate = ManipulationHelper(new Date().getTime());
    const postsPostedOnCurrentDate = postsByUserId.filter(
      (currentUserPost) =>
        ManipulationHelper(currentUserPost.createdAt) === currentDate
    );

    if (postsPostedOnCurrentDate.length >= 5) {
      return thunkAPI.dispatch(setIsAbleToPost(false));
    }
    return thunkAPI.dispatch(setIsAbleToPost(true));
  }
);

export const createPost = createAsyncThunk(
  'posts/creatPost',
  async (filtro: Filtro, thunkAPI): Promise<any> => {
    const { postText, userId } = filtro;
    const state = thunkAPI.getState() as RootState;

    if (!state.posts.isAbleToPost) {
      return ToastHelper.Erro('You have reached the posts limit per day.');
    }
    const allPosts = await postsService.getAllPosts();
    const user = await usersService.getUserById(userId!);

    if (user) {
      const postsWithNewPost: Post[] = [
        {
          id: uuidv4(),
          type: postType.POST,
          author: user,
          text: postText!,
          createdBy: user,
          createdAt: new Date().getTime(),
        },
        ...allPosts,
      ];

      const postedPost = postsService.createPost(
        localStorageKeys.POSTS,
        postsWithNewPost
      );
      ToastHelper.Sucesso('Successfully posted!');
      return postedPost;
    }

    return undefined;
  }
);

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (): Promise<Post[]> => {
    const allPosts = await postsService.getAllPosts();
    return allPosts;
  }
);

export const getPostsByUserId = createAsyncThunk(
  'posts/getPostsByUserId',
  async (userId: string): Promise<number> => {
    const postsByUser = await postsService.getAllPosts();
    const postsByUserId = postsByUser.filter(
      (userPosts: Post) => userPosts.createdBy.id === userId
    );
    return postsByUserId.length;
  }
);

export const createRepost = createAsyncThunk(
  'posts/createRePost',
  async (filtro: Filtro): Promise<any> => {
    const { postId, userId } = filtro;

    const allPosts = await postsService.getAllPosts();
    const user = await usersService.getUserById(userId!);

    if (user) {
      const postToRepost = allPosts.find((post: Post) => post.id === postId);
      const postsWithNewPost: Post[] = [
        {
          id: uuidv4(),
          type: postType.REPOST,
          author: postToRepost!.createdBy,
          text: postToRepost!.text,
          createdBy: user,
          createdAt: new Date().getTime(),
        },
        ...allPosts,
      ];

      const postedPost = postsService.createPost(
        localStorageKeys.POSTS,
        postsWithNewPost
      );
      ToastHelper.Sucesso('Successfully reposted!');
      return postedPost;
    }

    return undefined;
  }
);

export const createQuote = createAsyncThunk(
  'posts/createQuote',
  async (filtro: Filtro, thunkAPI): Promise<any> => {
    const { postId, quoteText, userId } = filtro;
    const state = thunkAPI.getState() as RootState;
    if (!state.posts.isAbleToPost) {
      return ToastHelper.Erro('You have reached the posts limit per day.');
    }
    const allPosts = await postsService.getAllPosts();

    const user = await usersService.getUserById(userId!);

    if (user) {
      const postToQuote = allPosts.find((post: Post) => post.id === postId);
      const postsWithNewQuote: Post[] = [
        {
          id: uuidv4(),
          type: postType.QUOTE,
          author: user,
          text: quoteText!,
          createdBy: user,
          createdAt: new Date().getTime(),
          quote: {
            text: postToQuote!.text,
            author: postToQuote!.createdBy,
          },
        },
        ...allPosts,
      ];

      const postedQuote = postsService.createPost(
        localStorageKeys.POSTS,
        postsWithNewQuote
      );
      ToastHelper.Sucesso('Successfully quoted!');
      return postedQuote;
    }

    return undefined;
  }
);

export const selectedPostToQuote = (state: RootState): any =>
  state.posts.postToQuote;

export const selectUpdatePosts = (state: RootState): boolean =>
  state.posts.updatePost;

export const selectedPosts = (state: RootState): any => state.posts.posts;

export default postsSlice.reducer;
