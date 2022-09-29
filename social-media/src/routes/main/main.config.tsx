import { RouteTemplate } from 'models/RouteTemplate';
import HomePage from 'pages/HomePage/HomePage.lazy';
import LayoutRoutes from 'routes/layout.routes';

const { layout } = LayoutRoutes.main;

export default [
  new RouteTemplate(LayoutRoutes.main.home, 'Home', layout, HomePage),
  new RouteTemplate(LayoutRoutes.main.root, 'Home', layout, HomePage),
];
