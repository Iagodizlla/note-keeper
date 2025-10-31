import { PartialObserver } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { AccessTokenModel, RegistroModel } from '../auth.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './registro.html',
})
export class Registro {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected registroForm: FormGroup = this.formBuilder.group({
    nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
  });

  get nomeCompleto() {
    return this.registroForm.get('nomeCompleto');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get senha() {
    return this.registroForm.get('senha');
  }

  get confirmarSenha() {
    return this.registroForm.get('confirmarSenha');
  }

  public registro() {
    if (this.registroForm.invalid) return;

    const registroModel: RegistroModel = this.registroForm.value;

    const registroObserver: PartialObserver<AccessTokenModel> = {
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/inicio']),
    };

    this.authService.registro(registroModel).subscribe(registroObserver);
  }
}