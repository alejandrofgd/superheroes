import { Component, Input, OnInit } from '@angular/core';
import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'superheroes-superhero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public superhero!: Superhero;

  ngOnInit(): void {
    if (!this.superhero) throw Error('Superhero property required');
  }
}
