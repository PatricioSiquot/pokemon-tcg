import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { CardGrid } from './components/card-grid/card-grid';
import { SearchBar } from './components/search-bar/search-bar';
import { CardBrief } from './models/card.model';
import { CardService } from './services/card.service';

const PAGE_SIZE = 20; // provisorio: cuando hagamos la paginación pasa a depender del dispositivo

/** Los tres estados posibles de la lista; imposible estar "cargando" y "con error" a la vez. */
type CardsState =
  { status: 'loading' } | { status: 'error' } | { status: 'success'; cards: CardBrief[] };

@Component({
  imports: [RouterOutlet, CardGrid, SearchBar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cardService = inject(CardService);

  /** Texto buscado, leído de la URL (?name=...). */
  protected readonly name = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('name') ?? '')),
    { initialValue: '' },
  );

  /** Resultado de la búsqueda actual; se recalcula cada vez que cambia el nombre. */
  protected readonly state = toSignal(
    toObservable(this.name).pipe(
      switchMap((name) =>
        this.cardService.searchCards({ name, pageSize: PAGE_SIZE }).pipe(
          map((cards): CardsState => ({ status: 'success', cards })),
          catchError(() => of<CardsState>({ status: 'error' })),
          startWith<CardsState>({ status: 'loading' }),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as CardsState },
  );

  protected onSearch(name: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name: name || null, page: null },
      queryParamsHandling: 'merge',
    });
  }
}
