import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,   // ✅ Add this
    FooterComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('Dms');
}
