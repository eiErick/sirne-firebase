import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { envirionment } from '../../../../enviroments/environment';
import { provideServiceWorker } from '@angular/service-worker'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions({
      onViewTransitionCreated: ({ transition }) => {
      }
    })),
    provideFirebaseApp(() => initializeApp(envirionment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
