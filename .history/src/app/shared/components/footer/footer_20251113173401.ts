import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
   standalone: true,
   imports: [NgClass, TranslateModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  darkMode = false;

  constructor(private themeService: ThemeService, public translate: TranslateService) {
    this.themeService.darkMode$.subscribe(mode => this.darkMode = mode);
  }

  currentYear = new Date().getFullYear();
}
