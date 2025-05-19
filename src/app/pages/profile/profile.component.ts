import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-profile',
  imports: [
    MatExpansionModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly panelOpenState = signal(false);
  chosen: 'light' | 'dark' | 'colorful' = 'light';
  
}
