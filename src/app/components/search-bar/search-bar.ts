import { Component, effect, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, filter, map, merge } from 'rxjs';

const MIN_CHARS = 3;
const DEBOUNCE_MS = 300;

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  /** Texto actual según la URL; el input se sincroniza con este valor. */
  readonly value = input('');
  readonly search = output<string>();

  protected readonly control = new FormControl('', { nonNullable: true });
  protected readonly enterPressed = new Subject<void>();

  constructor() {
    effect(() => {
      const value = this.value();
      if (this.control.value.trim() !== value) {
        this.control.setValue(value, { emitEvent: false });
      }
    });

    const typed$ = this.control.valueChanges.pipe(debounceTime(DEBOUNCE_MS));
    const enter$ = this.enterPressed.pipe(map(() => this.control.value));

    merge(typed$, enter$)
      .pipe(
        map((value) => value.trim()),
        // Vacío = "limpiar búsqueda" (se permite). Menos de MIN_CHARS se ignora.
        filter((value) => value.length === 0 || value.length >= MIN_CHARS),
        takeUntilDestroyed(),
      )
      .subscribe((value) => this.search.emit(value));
  }
}
