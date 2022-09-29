/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
import PostCard from 'components/PostCard/PostCard';
import { validRoutes } from 'models/enums/validRoutes';
import React, { useCallback, useEffect, useState } from 'react';
import { getWhoUserFollows } from 'store/followers/followers.slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectedPosts } from 'store/posts/posts.slice';
import { selectedUser } from 'store/user/user.slice';
import styles from './PostsList.module.scss';

export interface PostsListProps {
  onProfileClick?: any;
  userIdToFilterPosts?: any;
  filterMode?: any;
}

const PostsList: React.FC<PostsListProps> = (props) => {
  const user = useAppSelector(selectedUser);

  const { onProfileClick, userIdToFilterPosts, filterMode } = props;
  const [userFollows, setUserFollowss] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectedPosts);

  const getUserFollows = useCallback(async () => {
    dispatch(getWhoUserFollows(user.id!))
      .unwrap()
      .then((resp) => {
        setUserFollowss(
          resp.map((userFollow: any) => userFollow.followingUserId)
        );
      });
  }, [dispatch, user]);

  const returnPostsFiltered = useCallback(() => {
    const isOnlyFollowingPostsFilter =
      filterMode === validRoutes.FILTER_FOLLOWING;

    if (isOnlyFollowingPostsFilter) {
      return posts.filter((currentPost: any) => {
        return (
          userFollows.indexOf(currentPost.createdBy.id) > -1 && currentPost
        );
      });
    }

    if (!userIdToFilterPosts) return posts;

    return posts.filter(
      (currentPost: any) => currentPost.createdBy.id === userIdToFilterPosts
    );
  }, [filterMode, posts, userFollows, userIdToFilterPosts]);

  useEffect(() => {
    getUserFollows();
  }, [getUserFollows]);
  console.log(returnPostsFiltered());
  return (
    <div className={styles.PostsList} data-testid="PostsList">
      {returnPostsFiltered().map((currentPost: any, index: any) => (
        <div key={currentPost.id}>
          <PostCard
            postId={currentPost.id}
            type={currentPost.type}
            text={currentPost.text}
            author={currentPost.author}
            onProfileClick={onProfileClick}
            createdBy={currentPost.createdBy}
            quoteText={currentPost?.quote?.text}
            quoteUser={currentPost?.quote?.author}
          />

          {index !== posts.length && <hr className={styles.Divider} />}
        </div>
      ))}
    </div>
  );
};

export default React.memo(PostsList);
