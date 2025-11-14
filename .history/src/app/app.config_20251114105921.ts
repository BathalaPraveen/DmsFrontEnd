import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    // 🔥 Routing (must be top-level)
    provideRouter(routes),

    // 🔥 SSR + Hydration (Angular future support)
    provideClientHydration(withEventReplay()),

    // 🔥 HTTP Client
    provideHttpClient()
  ],
};
