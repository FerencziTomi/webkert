import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Painting } from '../../shared/models/painting';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-paintings',
  imports: [MatListModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './paintings.component.html',
  styleUrl: './paintings.component.scss'
})
export class PaintingsComponent {
  paintings: Painting[] = [
    { id: 1, name: "Starry Night", painter: "Vincent van Gogh", year: 1889, place: "Saint-Rémy-de-Provence, France", price: 1000 },
    { id: 2, name: "Mona Lisa", painter: "Leonardo da Vinci", year: 1503, place: "Florence, Italy", price: 8500 },
    { id: 3, name: "The Scream", painter: "Edvard Munch", year: 1893, place: "Oslo, Norway", price: 7200 },
    { id: 4, name: "Guernica", painter: "Pablo Picasso", year: 1937, place: "Madrid, Spain", price: 9300 },
    { id: 5, name: "The Persistence of Memory", painter: "Salvador Dalí", year: 1931, place: "New York, USA", price: 4700 },
    { id: 6, name: "Girl with a Pearl Earring", painter: "Johannes Vermeer", year: 1665, place: "The Hague, Netherlands", price: 5800 },
    { id: 7, name: "The Night Watch", painter: "Rembrandt", year: 1642, place: "Amsterdam, Netherlands", price: 6200 },
    { id: 8, name: "American Gothic", painter: "Grant Wood", year: 1930, place: "Chicago, USA", price: 3500 },
    { id: 9, name: "The Kiss", painter: "Gustav Klimt", year: 1907, place: "Vienna, Austria", price: 6900 },
    { id: 10, name: "Composition VII", painter: "Wassily Kandinsky", year: 1913, place: "Moscow, Russia", price: 4100 }
  ];

  isLogged=false;
  @Input() paintingName ='asd';
  @Output() addingPainting = new EventEmitter<string>();

  constructor(){}

  ngOnInit(){
    this.isLogged = localStorage.getItem('isLoggedIn') === 'true'
  }

  addPaintingToCart(pname: string){
    this.paintingName=pname;
    this.addingPainting.emit(pname)
  }
}