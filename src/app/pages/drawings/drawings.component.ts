import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Drawing } from '../../shared/models/drawing';

@Component({
  selector: 'app-drawings',
  imports: [MatListModule,
    CommonModule
  ],
  templateUrl: './drawings.component.html',
  styleUrl: './drawings.component.scss'
})
export class DrawingsComponent {
  drawings: Drawing[]=[
    { id: 1, name: "Study of Hands", drawer: "Leonardo da Vinci", year: 1489, place: "Milan, Italy", price: 1200, blackwhite: true },
    { id: 2, name: "Self Portrait", drawer: "Albrecht Dürer", year: 1493, place: "Nuremberg, Germany", price: 1400, blackwhite: false },
    { id: 3, name: "Seated Male Nude", drawer: "Michelangelo", year: 1511, place: "Rome, Italy", price: 1600, blackwhite: true },
    { id: 4, name: "Horse and Rider", drawer: "Leonardo da Vinci", year: "unknown", place: "Florence, Italy", price: 1300, blackwhite: true },
    { id: 5, name: "Trees and Bushes", drawer: "Vincent van Gogh", year: 1882, place: "The Hague, Netherlands", price: 800, blackwhite: false }
  ];
}
