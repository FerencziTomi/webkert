import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DrawingsComponent } from './pages/drawings/drawings.component';
import { PaintingsComponent } from './pages/paintings/paintings.component';
import { StatuesComponent } from './pages/statues/statues.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CardComponent } from './pages/card/card.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "drawings", component: DrawingsComponent},
    { path: "paintings", component: PaintingsComponent},
    { path: "statues", component: StatuesComponent },
    { path: "profile", component: ProfileComponent},
    { path: "artists", component: ArtistsComponent },
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignupComponent},
    { path: "card", component: CardComponent }
];
