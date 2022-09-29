/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CustomButton from 'components/CustomButton/CustomButton';
import { postType } from 'models/enums/postTypes';
import User from 'models/User';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createRepost,
  selectUpdatePosts,
  setSelectedPostToQuote,
  setUpdatePost,
} from 'store/posts/posts.slice';
import { selectedUser } from 'store/user/user.slice';
import styles from './PostCard.module.scss';

export interface PostCardProps {
  type?: string;
  text?: string;
  author?: User;
  postId?: any;
  createdBy?: User;
  quoteUser?: any;
  quoteText?: string;
  onProfileClick?: any;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const {
    type,
    text,
    author,
    postId,
    createdBy,
    quoteUser,
    quoteText,
    onProfileClick,
  } = props;
  const user = useAppSelector(selectedUser);
  const dispatch = useAppDispatch();
  const updatePost = useAppSelector(selectUpdatePosts);
  const handleOnClickOverUserProfile = (): void => {
    onProfileClick(author!.id);
  };

  const handleOnClickOverWhoReposted = (): void => {
    onProfileClick(createdBy!.id);
  };
  const handleOnClickToRepost = async (): Promise<any> => {
    dispatch(createRepost({ postId, userId: user.id })).then(() => {
      dispatch(setSelectedPostToQuote(null));
      dispatch(setUpdatePost(!updatePost));
    });
  };

  return (
    <div className={styles.PostCard} data-testid="PostCard">
      {type === postType.REPOST && (
        <h3>
          ↓ reposted by
          <span onClick={handleOnClickOverWhoReposted}>
            @{createdBy?.username}
          </span>
        </h3>
      )}

      {author && (
        <CustomButton
          onClick={handleOnClickOverUserProfile}
          text={` @${author.username}`}
          className={styles.UserNameTextButton}
        />
      )}

      {text && <p>{text}</p>}

      {type === postType.QUOTE && (
        <div className={styles.QuoteTextContainer}>
          <CustomButton
            disabled
            text={` @${quoteUser?.username}`}
            className={styles.UserNameTextButton}
          />

          <p>{quoteText}</p>
        </div>
      )}

      {type === postType.POST && createdBy!.id !== user.id && (
        <div className={styles.ActionTextButtonsContainer}>
          <CustomButton
            onClick={handleOnClickToRepost}
            text="repost"
            className={styles.ActionTextButton}
          />

          <CustomButton
            onClick={() =>
              dispatch(
                setSelectedPostToQuote({
                  type,
                  text,
                  author,
                  createdBy,
                  id: postId,
                })
              )
            }
            text="quote"
            className={styles.ActionTextButton}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(PostCard);
