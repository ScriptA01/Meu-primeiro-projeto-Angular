import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // mantém os providers já existentes
    provideHttpClient(),            // adiciona o HttpClient
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
}).catch((err) => console.error(err));