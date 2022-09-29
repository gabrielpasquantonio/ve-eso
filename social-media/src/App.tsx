import classnames from 'classnames';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayoutRoutes from 'routes/layout.routes';
import styles from 'scss/App.module.scss';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import ContainerToast from 'components/Toast/ContainerToast/ContainerToast';

const App: React.FC = () => {
  const removeLoaderIndex = (): void => {
    const divLoaderIndex = document.getElementById('divLoaderIndex');
    if (divLoaderIndex) {
      divLoaderIndex.classList.add('available');
      setTimeout(() => {
        if (divLoaderIndex.parentNode) {
          divLoaderIndex.outerHTML = '';
        }
      }, 2000);
    }
  };

  Modal.setAppElement('#root');

  React.useEffect(() => {
    removeLoaderIndex();
  }, []);

  return (
    <div className={classnames(styles.App)} data-testid="App">
      <Router>
        <Switch>
          <Route path={LayoutRoutes.main.root} render={() => <MainLayout />} />
        </Switch>
        <ContainerToast />
      </Router>
    </div>
  );
};

export default App;
