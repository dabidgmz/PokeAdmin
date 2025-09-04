import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js').then(() => {
      console.log('Service Worker registrado con éxito yujujuuu');
    }).catch((err) => {
      console.error('Service Worker no registrado buu', err);
    });
  });
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
