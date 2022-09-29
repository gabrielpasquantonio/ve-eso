import CustomButton from 'components/CustomButton/CustomButton';
import CustomTextArea from 'components/CustomTextArea/CustomTextArea';
import PostCard from 'components/PostCard/PostCard';
import { postType } from 'models/enums/postTypes';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createPost,
  createQuote,
  getAllPosts,
  isUserAbleToPost,
  selectedPostToQuote,
  selectUpdatePosts,
  setPosts,
  setSelectedPostToQuote,
  setUpdatePost,
} from 'store/posts/posts.slice';
import { selectedUser } from 'store/user/user.slice';
import styles from './AddPost.module.scss';

const AddPost: React.FC = () => {
  const user = useAppSelector(selectedUser);
  const [postText, setPostText] = useState<string>('');
  const dispatch = useAppDispatch();
  const postToQuote = useAppSelector(selectedPostToQuote);
  const updatePost = useAppSelector(selectUpdatePosts);

  useEffect(() => {
    if (!postToQuote) return;

    window.scrollTo(0, 0);
  }, [postToQuote]);

  const handleOnChangeTextArea = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPostText(event.target.value);
  };

  const handleOnClickToPost = async (): Promise<void> => {
    if (postToQuote && postToQuote.id) {
      dispatch(
        createQuote({
          postId: postToQuote.id,
          quoteText: postText,
          userId: user.id,
        })
      ).then(() => {
        dispatch(setUpdatePost(!updatePost));
        dispatch(setSelectedPostToQuote(null));
      });
    } else {
      dispatch(createPost({ postText, userId: user.id })).then(() => {
        dispatch(setUpdatePost(!updatePost));
        dispatch(setSelectedPostToQuote(null));
      });
    }

    setPostText('');
  };

  useEffect(() => {
    dispatch(getAllPosts())
      .unwrap()
      .then((response) => {
        dispatch(setPosts(response));
        dispatch(isUserAbleToPost(user.id!));
      });
  }, [updatePost]);

  return (
    <div className={styles.AddPost} data-testid="AddPost">
      <h3>what do you want to post?</h3>
      <CustomTextArea value={postText} onChange={handleOnChangeTextArea} />
      <div className={styles.ButtonContainer}>
        <CustomButton text="Post" onClick={handleOnClickToPost} />
      </div>
      {postToQuote && (
        <>
          <p>Comment something about the post below:</p>
          <div className={styles.PostCardContainer}>
            <PostCard
              type={postType.QUOTE}
              postId={postToQuote.id}
              quoteText={postToQuote.text}
              quoteUser={postToQuote.author}
              createdBy={postToQuote.createdBy}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(AddPost);
