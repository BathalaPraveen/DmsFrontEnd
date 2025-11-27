import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    )
  ]
}).catch(err => console.error(err));
