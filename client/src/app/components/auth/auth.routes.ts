import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Registro } from './registro/registro';

export const authRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
];