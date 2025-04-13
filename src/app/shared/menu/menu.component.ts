import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule,
    MatToolbarModule, 
    RouterLink, 
    MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  ngOnInit(){
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  logout(){
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/';
  }
}
