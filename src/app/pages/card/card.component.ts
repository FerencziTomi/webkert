import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  paintingName='asd';

  ngOnInit(){
  }

  paintingToCart(name: string): void{
    this.paintingName=name;
  }
}
