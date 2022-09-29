import AddPost from 'components/AddPost/AddPost';
import FeedFilter from 'components/FeedFilter/FeedFilter';
import PostsList from 'components/PostsList/PostsList';
import UserInfoModal from 'components/UserInfoModal/UserInfoModal';
import { localStorageKeys } from 'models/enums/localStorageKeys';
import { validRoutes } from 'models/enums/validRoutes';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import localStorageService from 'services/localStorage.service';
import { useAppDispatch } from 'store/hooks';
import { getAllPosts, setPosts } from 'store/posts/posts.slice';
import { getUserLoggedIn, setUser } from 'store/user/user.slice';
import { followersMock } from '__mocks__/followers';
import { postsMock } from '__mocks__/posts';
import { usersMock } from '__mocks__/users';
import styles from './HomePage.module.scss';

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [filterMode, setFilterMode] = useState(validRoutes.FILTER_ALL);
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [selectedUserIdToShowOnModal, setSelectedUserIdToShowOnModal] =
    useState(false);

  const validateRoutesOnLoadPage = useCallback(() => {
    const currentPath = history.location.pathname;

    const isValidRoute =
      currentPath === `/${validRoutes.FILTER_ALL}` ||
      currentPath === `/${validRoutes.FILTER_FOLLOWING}`;

    if (!isValidRoute) {
      setFilterMode(validRoutes.FILTER_ALL);
      history.push(`/${validRoutes.FILTER_ALL}`);
    }

    if (currentPath.indexOf(validRoutes.FILTER_FOLLOWING) > -1) {
      setFilterMode(validRoutes.FILTER_FOLLOWING);
    }
  }, [history]);

  const handleOnProfileClick = (selectedUserId: any): any => {
    setSelectedUserIdToShowOnModal(selectedUserId);
    setUserInfoModalOpen(true);

    setFilterMode(validRoutes.FILTER_ALL);
    history.push(`/${validRoutes.USER_INFO}`);
  };

  const handleMockedData = (): void => {
    localStorageService.salvar(localStorageKeys.POSTS, postsMock);
    localStorageService.salvar(localStorageKeys.USERS, usersMock);
    localStorageService.salvar(localStorageKeys.FOLLOWERS, followersMock);
  };

  useEffect(() => {
    dispatch(getUserLoggedIn())
      .unwrap()
      .then((response) => {
        dispatch(setUser(response));
      });

    handleMockedData();
  }, []);

  useEffect(() => {
    validateRoutesOnLoadPage();
  }, [validateRoutesOnLoadPage]);

  const handleOnChangeFitlerMode = (filterModeOption: any): void => {
    setFilterMode(filterModeOption);
  };

  const handleOnClickToCloseUserInfoModal = (): void => {
    setUserInfoModalOpen(false);

    setFilterMode(validRoutes.FILTER_ALL);
    history.push(`/${validRoutes.FILTER_ALL}`);
  };

  return (
    <div className={styles.HomePage} data-testid="HomePage">
      <div className={styles.AddPostContainer}>
        <AddPost />
      </div>

      <div className={styles.FeedHeaderContainer}>
        <h3>
          your <span>feed</span>.
        </h3>
        <FeedFilter selectedMode={handleOnChangeFitlerMode} />
      </div>
      <div className={styles.PostsListContainer}>
        <PostsList
          filterMode={filterMode}
          onProfileClick={handleOnProfileClick}
        />
      </div>
      {isUserInfoModalOpen && (
        <UserInfoModal
          userId={selectedUserIdToShowOnModal}
          onCloseModal={handleOnClickToCloseUserInfoModal}
        />
      )}
    </div>
  );
};

export default HomePage;
