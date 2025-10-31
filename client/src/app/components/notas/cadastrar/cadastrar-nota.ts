import { filter, map, Observer } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ListagemCategoriasModel } from '../../categorias/categoria.models';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { CadastrarNotaModel, CadastrarNotaResponseModel } from '../nota.models';
import { NotaService } from '../nota.service';

@Component({
  selector: 'app-cadastrar-nota',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-nota.html',
})
export class CadastrarNota {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly notaService = inject(NotaService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected notaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    conteudo: [''],
    categoriaId: ['', [Validators.required]],
  });

  get titulo() {
    return this.notaForm.get('titulo');
  }

  get conteudo() {
    return this.notaForm.get('conteudo');
  }

  get categoriaId() {
    return this.notaForm.get('categoriaId');
  }

  protected readonly categorias$ = this.route.data.pipe(
    filter((data) => data['categorias']),
    map((data) => data['categorias'] as ListagemCategoriasModel[]),
  );

  public cadastrar() {
    if (this.notaForm.invalid) return;

    const notaModel: CadastrarNotaModel = this.notaForm.value;

    const cadastroObserver: Observer<CadastrarNotaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O registro "${notaModel.titulo}" foi cadastrado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/notas']),
    };

    this.notaService.cadastrar(notaModel).subscribe(cadastroObserver);
  }
}
