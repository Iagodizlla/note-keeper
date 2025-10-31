import { Component } from '@angular/core';
import { ShellComponent } from "./components/shared/shell/shell.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <router-outlet></router-outlet>
    </app-shell>
  `,
  imports: [ShellComponent, RouterOutlet],
})
export class App {}
