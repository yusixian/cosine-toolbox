type Router = {
  name?: string;
  key?: string;
  path: string;

  needOwner?: boolean;
};
export enum Routes {
  Home = '/',
}
export const routers: Router[] = [{ name: '首页', path: Routes.Home }];
