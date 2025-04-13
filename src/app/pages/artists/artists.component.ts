import { Component } from '@angular/core';
import { Artist } from '../../shared/models/artist';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from "../../shared/pipes/date.pipe";


@Component({
  selector: 'app-artists',
  imports: [MatListModule, DatePipe],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  artists: Artist[] = [
    { id: 1, name: "Vincent van Gogh", birth: new Date("1853-03-30"), place: "Zundert, Netherlands", works_in: "Festő" },
    { id: 2, name: "Michelangelo Buonarroti", birth: new Date("1475-03-06"), place: "Caprese, Italy", works_in: "Szobrász" },
    { id: 3, name: "Leonardo da Vinci", birth: new Date("1452-04-15"), place: "Vinci, Italy", works_in: "Festő" },
    { id: 4, name: "Frida Kahlo", birth: new Date("1907-07-06"), place: "Coyoacán, Mexico", works_in: "Festő" },
    { id: 5, name: "Auguste Rodin", birth: new Date("1840-11-12"), place: "Paris, France", works_in: "Szobrász" },
    { id: 6, name: "Pablo Picasso", birth: new Date("1881-10-25"), place: "Málaga, Spain", works_in: "Festő" },
    { id: 7, name: "Albrecht Dürer", birth: new Date("1471-05-21"), place: "Nuremberg, Germany", works_in: "Rajzoló" },
    { id: 8, name: "Egon Schiele", birth: new Date("1890-06-12"), place: "Tulln, Austria", works_in: "Rajzoló" },
    { id: 9, name: "Banksy", birth: new Date("1974-01-01"), place: "Bristol, United Kingdom", works_in: "Más" },
    { id: 10, name: "Unknown Artist", birth: new Date("1900-01-01"), place: "Unknown", works_in: "Más" }
  ];
}
