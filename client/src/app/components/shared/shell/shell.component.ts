import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { UsuarioAutenticadoModel } from '../../auth/auth.models';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    RouterLink,
  ],
})
export class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  public itensNavbar = [
    { titulo: 'Início', icone: 'home', link: '/inicio' },
    { titulo: 'Categorias', icone: 'label', link: '/categorias' },
    { titulo: 'Notas', icone: 'collections_bookmark', link: '/notas' },
  ];

  @Input({ required: true }) usuarioAutenticado!: UsuarioAutenticadoModel;
  @Output() logoutRequisitado = new EventEmitter<void>();
}
