import Register from "../pages/register";
import AllProducts from "../pages/allProducts/AllProducts";
import {
  Login,
  ForgotPassword,
  ResetPassword,
  ErrorPage,
  Dashboard,
  MainLayout,
  Users,
  ProductDetails,
  Orders,
  Inventory,
  Games,
  Gears,
  MyOrders,
  Favorites,
} from "../pages";
import { Complain } from "../pages/comaplians";

export const path = {
  login: "/login",
  complain: "/complains",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dasboard",
  errorPage: "/error",
  users: "/users",
  inventory: "/inventory",
  allProducts: "/allProducts",
  allOrders: "/allOrders",
  games: "/games",
  gears: "/gears",
  myOrders: "/myOrders",
  productDetails: "/productDetails",
  favorites: "/favorites",
};
export const routes = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
  resetPassword: "ResetPassword",
  dashboard: "dasboard",
  errorPage: "error",
  users: "users",
  inventory: "inventory",
  allProducts: "allProducts",
  allOrders: "allOrders",
  complain: "complains",
  games: "games",
  gears: "gears",
  myOrders: "myOrders",
  productDetails: "productDetails",
  favorites: "favorites",
};

export const privatePageRoutes = {
  [routes.dashboard]: {
    name: routes.dashboard,
    path: path.dashboard,
    component: MainLayout,
    subPage: Dashboard,
    selectedId: 0,
  },
  [routes.users]: {
    name: routes.users,
    path: path.users,
    component: MainLayout,
    subPage: Users,
    selectedId: 1,
  },
  [routes.inventory]: {
    name: routes.inventory,
    path: path.inventory,
    component: MainLayout,
    subPage: Inventory,
    selectedId: 2,
  },
  [routes.complain]: {
    name: routes.complain,
    path: path.complain,
    component: MainLayout,
    subPage: Complain,
    selectedId: 4,
  },
  [routes.allProducts]: {
    name: routes.allProducts,
    path: path.allProducts,
    component: MainLayout,
    subPage: AllProducts,
    selectedId: 2,
  },
  [routes.allOrders]: {
    name: routes.allOrders,
    path: path.allOrders,
    component: MainLayout,
    subPage: Orders,
    selectedId: 3,
  },
  [routes.games]: {
    name: routes.games,
    path: path.games,
    component: MainLayout,
    subPage: Games,
    selectedId: 0,
  },
  [routes.gears]: {
    name: routes.gears,
    path: path.gears,
    component: MainLayout,
    subPage: Gears,
    selectedId: 1,
  },
  [routes.myOrders]: {
    name: routes.myOrders,
    path: path.myOrders,
    component: MainLayout,
    subPage: MyOrders,
    selectedId: 2,
  },
  [routes.productDetails]: {
    name: routes.productDetails,
    path: path.productDetails,
    component: MainLayout,
    subPage: ProductDetails,
    selectedId: 3,
  },
  [routes.favorites]: {
    name: routes.favorites,
    path: path.favorites,
    component: MainLayout,
    subPage: Favorites,
    selectedId: 3,
  },
};
export const publicPageRoutes = {
  [routes.login]: {
    name: routes.login,
    path: path.login,
    component: Login,
  },
  [routes.register]: {
    name: routes.register,
    path: path.register,
    component: Register,
  },
};
export const errorPageRoute = {
  [routes.errorPage]: {
    name: routes.errorPage,
    path: path.errorPage,
    component: ErrorPage,
  },
};

export const privatePaths = [
  //All Private Routes Should be place here
  path.dashboard,
];

export const publicPaths = [path.login];
