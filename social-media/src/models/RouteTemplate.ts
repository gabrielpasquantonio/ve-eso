import { FC } from 'react';

export class RouteTemplate {
  public constructor(
    public path: string,
    public name: string,
    public layout?: string,
    public component?: FC
  ) {}
}
