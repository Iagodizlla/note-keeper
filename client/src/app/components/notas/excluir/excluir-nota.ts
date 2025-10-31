import { filter, map, Observable, Observer, shareReplay, switchMap, take } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { DetalhesNotaModel } from '../nota.models';
import { NotaService } from '../nota.service';

@Component({
  selector: 'app-excluir-nota',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './excluir-nota.html',
})
export class ExcluirNota {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notaService = inject(NotaService);
  private readonly notificacaoService = inject(NotificacaoService);

  protected readonly nota$: Observable<DetalhesNotaModel> = this.route.data.pipe(
    filter((data) => data['nota']),
    map((data) => data['nota'] as DetalhesNotaModel),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public excluir() {
    const exclusaoObserver: Observer<null> = {
      next: () => this.notificacaoService.sucesso('O registro foi excluído com sucesso!'),
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/notas']),
    };

    this.nota$
      .pipe(
        take(1),
        switchMap((nota) => this.notaService.excluir(nota.id)),
      )
      .subscribe(exclusaoObserver);
  }
}
