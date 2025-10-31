import { finalize } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { CadastrarCategoriaModel } from '../categoria.models';
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

  protected categoriaForm = this.formBuilder.group({
    titulo: [''],
  });

  public cadastrar() {
    if (this.categoriaForm.invalid) return;

    const categoriaModel = this.categoriaForm.value as CadastrarCategoriaModel;

    this.categoriaService
      .cadastrar(categoriaModel)
      .pipe(finalize(() => this.router.navigate(['/categorias'])))
      .subscribe((res) => console.log(res));
  }
}