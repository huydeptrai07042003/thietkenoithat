import React from 'react';
import { Home, Introduction, Projects, Login, SignUp, SingleProject, Admin, User, Feedbacks } from '../pages';
import HeaderLayout from '../layouts/headerOnly';
//Admin Page
import AdminProducts from '../layouts/components/Admin/AdminProducts';
import AdminUsers from '../layouts/components/Admin/AdminUsers';
import ProductManage from '../layouts/components/Admin/ProductManage';

interface Router {
  path: string;
  component: React.FC;
  layout?: React.ElementType;
  role?: 'admin' | 'customer';
}

//Public Router
const publicRouter: Router[] = [
  { path: '/', component: Home },
  { path: '/introduction', component: Introduction },
  { path: '/products/:id', component: SingleProject, layout: HeaderLayout },
  { path: '/products', component: Projects },
  { path: '/login', component: Login, layout: HeaderLayout },
  { path: '/signup', component: SignUp, layout: HeaderLayout },
  { path: '/user', component: User, layout: HeaderLayout },
  { path: '/feedbacks', component: Feedbacks, layout: HeaderLayout },
];

//Private Router
const privateRouter: Router[] = [
  { path: '/admin/users', component: AdminUsers, role: 'admin', layout: HeaderLayout },
  { path: '/admin/products', component: AdminProducts, role: 'admin', layout: HeaderLayout },
  { path: '/admin/products/:id', component: ProductManage, role: 'admin', layout: HeaderLayout },
  { path: '/admin', component: Admin, role: 'admin', layout: HeaderLayout },
];

export { publicRouter, privateRouter };
