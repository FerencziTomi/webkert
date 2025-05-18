import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/services/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    { 
        path: "drawings", 
        loadComponent: () => import('./pages/drawings/drawings.component').then(m => m.DrawingsComponent)
    },
    { 
        path: "paintings", 
        loadComponent: () => import('./pages/paintings/paintings.component').then(m => m.PaintingsComponent)
    },
    { 
        path: "statues",
        loadComponent: () => import('./pages/statues/statues.component').then(m => m.StatuesComponent)
    },
    { 
        path: "profile", 
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    { 
        path: "artists", 
        loadComponent: () => import('./pages/artists/artists.component').then(m => m.ArtistsComponent)
    },
    { 
        path: "login", 
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [publicGuard]
    },
    { 
        path: "signup", 
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
        canActivate: [publicGuard]
    },
    { 
        path: "card", 
        loadComponent: () => import('./pages/card/card.component').then(m => m.CardComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
