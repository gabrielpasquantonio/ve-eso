import classNames from 'classnames';
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import AddPost from 'components/AddPost/AddPost';

import CustomButton from 'components/CustomButton/CustomButton';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getPostsByUserId, selectUpdatePosts } from 'store/posts/posts.slice';
import { ManipulationHelper } from 'helpers/manipulation.helper';
import {
  getUserById,
  getWhoUserFollows,
  selectedUser,
  setUser,
} from 'store/user/user.slice';
import {
  followOrUnfollowUser,
  getUserFollowers,
  verifyIfIsLoggedInUserFollowing,
} from 'store/followers/followers.slice';
import User from 'models/User';
import PostsList from '../PostsList/PostsList';

import styles from './UserInfoModal.module.scss';

interface UserInfoModalProps {
  onCloseModal: any;
  userId: any;
}
const UserInfoModal: React.FC<UserInfoModalProps> = (props) => {
  const { onCloseModal, userId } = props;
  const user = useAppSelector(selectedUser);
  const dispatch = useAppDispatch();
  const [updateFollowers, setUpdateFollowers] = useState(true);
  const updatePost = useAppSelector(selectUpdatePosts);
  const [postsAmount, setPostsAmount] = useState(0);
  const [userFollows, setWhoUserFollows] = useState(0);
  const [userFollowers, setUserFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState();
  const [userDetails, setUserDetails] = useState<User>();

  useEffect(() => {
    dispatch(getPostsByUserId(userId))
      .unwrap()
      .then((resp) => {
        setPostsAmount(resp);
      });

    if (userId !== user.id) {
      dispatch(getUserById(userId))
        .unwrap()
        .then((response) => {
          setUserDetails(response);
          setUser(response);
        });
    } else {
      setUserDetails(user);
    }
  }, [userId]);

  useEffect(() => {
    dispatch(getPostsByUserId(userId))
      .unwrap()
      .then((resp) => {
        setPostsAmount(resp);
      });
  }, [updatePost]);

  useEffect(() => {
    dispatch(getWhoUserFollows(userId))
      .unwrap()
      .then((resp) => {
        setWhoUserFollows(resp.length);
      });
    dispatch(getUserFollowers(userId))
      .unwrap()
      .then((resp) => {
        setUserFollowers(resp.length);
      });
    dispatch(
      verifyIfIsLoggedInUserFollowing({
        userId: user.id,
        userToGetInfoId: userId,
      })
    )
      .unwrap()
      .then((resp) => {
        setIsFollowing(resp);
      });
  }, [updateFollowers]);

  const handleFollow = (): void => {
    dispatch(
      followOrUnfollowUser({
        userId: user.id,
        userToGetInfoId: userId,
        isFollowing,
      })
    );
    setUpdateFollowers(!updateFollowers);
  };

  return (
    <Modal
      isOpen
      className={classNames('react-modal-content', styles.UserInfoModal)}
      data-testid="UserInfoModal"
      overlayClassName="react-modal-overlay"
    >
      <div className={styles.ButtonContainer}>
        <CustomButton
          className={styles.CloseButton}
          onClick={onCloseModal}
          text="X"
        />
      </div>
      <h2>
        <span>@</span>
        {userDetails?.username}
      </h2>

      <hr className={styles.Divider} />

      <div className={styles.UserPropertiesContainer}>
        <div className={styles.UserPropertyItemWrapper}>
          <h4>Member since:</h4>
          <p>{ManipulationHelper(userDetails?.createdAt)}</p>
        </div>

        <div className={styles.UserPropertiesContainer}>
          <h4>Followers</h4>
          <p>{userFollowers}</p>
        </div>

        <div className={styles.UserPropertiesContainer}>
          <h4>Following</h4>
          <p>{userFollows}</p>
        </div>

        <div className={styles.UserPropertiesContainer}>
          <h4>Posts</h4>
          <p>{postsAmount}</p>
        </div>
      </div>

      <hr className={styles.Divider} />

      {userId !== user.id && (
        <div className={styles.ButtonContainer}>
          <CustomButton
            onClick={handleFollow}
            text={isFollowing ? 'Unfollow' : 'Follow'}
          />
        </div>
      )}

      <hr className={styles.Divider} />

      <div className={styles.AddPostContainer}>
        <AddPost />
      </div>

      <hr className={styles.Divider} />

      <h3>
        {userDetails?.name} <span>posts</span>.
      </h3>

      <hr className={styles.Divider} />

      <PostsList userIdToFilterPosts={userId} />
    </Modal>
  );
};

export default React.memo(UserInfoModal);
