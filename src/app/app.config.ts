import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "test-56d1d", appId: "1:30945917422:web:84d5c855a0ec481982b6ff", storageBucket: "test-56d1d.firebasestorage.app", apiKey: "AIzaSyBZeAbWM6eTJQeFhmVWVHA8jmU-LsNkqEs", authDomain: "test-56d1d.firebaseapp.com", messagingSenderId: "30945917422", measurementId: "G-PJMRD50VEG" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
