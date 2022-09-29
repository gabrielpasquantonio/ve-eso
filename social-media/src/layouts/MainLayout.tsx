import React, { useEffect } from 'react';
import { useLocation, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import LayoutRoutes from 'routes/layout.routes';
import RoutesHelper from 'helpers/routes.helper';

import classnames from 'classnames';

import CustomHeader from 'components/CustomHeader/CustomHeader';
import styles from './MainLayout.module.scss';

const MainLayout: any = () => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [location]);

  return (
    <div className={classnames(styles.MainLayout)} ref={mainContent}>
      <CustomHeader />
      <Container className={classnames(styles.MainLayout, 'px-0')} fluid>
        <Switch>
          {RoutesHelper.getRoutes(LayoutRoutes.main.root)}
          <Redirect from="*" to={LayoutRoutes.main.home} />
        </Switch>
      </Container>
    </div>
  );
};

export default MainLayout;
