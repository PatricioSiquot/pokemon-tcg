import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { CardGrid } from './components/card-grid/card-grid';
import { CardBrief } from './models/card.model';
import { CardService } from './services/card.service';

/** Los tres estados posibles de la lista; imposible estar "cargando" y "con error" a la vez. */
type CardsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; cards: CardBrief[] };

@Component({
  imports: [RouterOutlet, CardGrid],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly cardService = inject(CardService);

  protected readonly state = toSignal(
    this.cardService.searchCards({ pageSize: 20 }).pipe(
      map((cards): CardsState => ({ status: 'success', cards })),
      catchError(() => of<CardsState>({ status: 'error' })),
    ),
    { initialValue: { status: 'loading' } as CardsState },
  );
}
