import { Observer } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { CadastrarCategoriaModel, CadastrarCategoriaResponseModel } from '../categoria.models';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-categoria.html',
})
export class CadastrarCategoria {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly categoriaService = inject(CategoriaService);
  protected readonly router = inject(Router);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected categoriaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  public cadastrar() {
    if (this.categoriaForm.invalid) return;

    const categoriaModel: CadastrarCategoriaModel = this.categoriaForm.value;

    const cadastroObserver: Observer<CadastrarCategoriaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O registro "${categoriaModel.titulo}" foi cadastrado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/categorias']),
    };

    this.categoriaService.cadastrar(categoriaModel).subscribe(cadastroObserver);
  }
}