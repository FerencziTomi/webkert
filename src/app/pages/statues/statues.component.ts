import { Component } from '@angular/core';
import { Statue } from '../../shared/models/statue';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-statues',
  imports: [MatListModule],
  templateUrl: './statues.component.html',
  styleUrl: './statues.component.scss'
})
export class StatuesComponent {
  statues: Statue[] = [
    { id: 1, name: "David", sculptor: "Michelangelo", height: 517, weight: 6000, place: "Florence, Italy", year: 1504, price: 8500 },
    { id: 2, name: "The Thinker", sculptor: "Auguste Rodin", height: 180, weight: 700, place: "Paris, France", year: 1904, price: 4600 },
    { id: 3, name: "Venus de Milo", sculptor: "Alexandros of Antioch", height: 203, weight: 900, place: "Louvre, France", year: "unknown", price: 7200 }
  ];
}
