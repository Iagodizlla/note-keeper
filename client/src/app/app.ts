import { Component } from '@angular/core';
import { ShellComponent } from "./components/shared/shell/shell.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ShellComponent, RouterOutlet],
})
export class App {}
