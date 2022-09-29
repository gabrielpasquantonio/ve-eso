import React from 'react';
import { Route } from 'react-router-dom';
import routes from 'routes/layout.config';
import RegexHelper from './regex.helper';

const regexParams = /:(\w+)/g;

class RoutesHelper {
  static getRoutesByLayout = (layout: string): any => {
    return routes.filter((x) => x.layout === layout);
  };

  static getRoutes = (layout: string): any => {
    const layoutRoutes = RoutesHelper.getRoutesByLayout(layout);

    return layoutRoutes.map(
      (prop: any, key: React.Key | undefined | undefined) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      }
    );
  };

  static buildRoute = (
    pathname: string,
    params: string | number | any | undefined
  ): string => {
    if (params) {
      if (params.constructor === Object) {
        const path = pathname.replace(
          regexParams,
          (propFull: string, prop: string): string => {
            return params[prop]?.toString();
          }
        );

        return path;
      }

      const keyParams = RegexHelper.getFirstMatch(pathname, regexParams);

      if (keyParams) {
        return pathname.replace(keyParams, params);
      }
    }
    return pathname;
  };
}

export default RoutesHelper;
