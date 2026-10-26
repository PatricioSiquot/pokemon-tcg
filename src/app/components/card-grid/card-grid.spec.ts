import { TestBed } from '@angular/core/testing';
import { makeCard } from '../../testing/card.fixtures';
import { CardGrid } from './card-grid';

describe('CardGrid', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [CardGrid] }));

  it('renders one item per card', () => {
    const fixture = TestBed.createComponent(CardGrid);
    fixture.componentRef.setInput('cards', [
      makeCard({ id: 'a' }),
      makeCard({ id: 'b' }),
      makeCard({ id: 'c' }),
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-card-item').length).toBe(3);
  });
});
