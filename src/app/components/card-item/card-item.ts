import { Component, computed, input } from '@angular/core';
import { CardBrief } from '../../models/card.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.html',
})
export class CardItem {
  readonly card = input.required<CardBrief>();

  /** Agregar nombre de archivo de la imagen. */
  protected readonly imageUrl = computed(() => {
    const image = this.card().image;
    return image ? `${image}/low.webp` : null;
  });
}