import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent,
    MatIconModule,
    MatSidenavModule,
    MatSidenav,
    MatToolbarModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'da-vinci-line';
  isLoggedIn = false;

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    window.location.href = '/';
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
