import { Component, input } from '@angular/core';
import { CardBrief } from '../../models/card.model';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-card-grid',
  imports: [CardItem],
  templateUrl: './card-grid.html',
})
export class CardGrid {
  readonly cards = input.required<CardBrief[]>();
}
