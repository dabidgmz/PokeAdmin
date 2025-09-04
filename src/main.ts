import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js').then(() => {
      console.log('Service Worker registrado con éxito yujujuuu');
    }).catch((err) => {
      console.error('Service Worker no registrado buu', err);
    });
  });
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
