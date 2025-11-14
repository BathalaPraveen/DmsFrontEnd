import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private dark$ = new BehaviorSubject<boolean>(!!localStorage.getItem('darkMode'));
  darkMode$ = this.dark$.asObservable();

  toggle() {
    const v = !this.dark$.value;
    localStorage.setItem('darkMode', v ? '1' : '');
    this.dark$.next(v);
  }

  isDark() { return this.dark$.value; }
}
