import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideNotifications } from './components/shared/notificacao/notificacao.provider';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./components/categorias/categoria.routes').then((r) => r.categoriaRoutes),
  },
  {
    path: 'notas',
    loadChildren: () => import('./components/notas/nota.routes').then((r) => r.notaRoutes),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideNotifications(),
  ]
};
