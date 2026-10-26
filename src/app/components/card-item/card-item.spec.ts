import { TestBed } from '@angular/core/testing';
import { CardBrief } from '../../models/card.model';
import { makeCard } from '../../testing/card.fixtures';
import { CardItem } from './card-item';

describe('CardItem', () => {
  function render(card: CardBrief): HTMLElement {
    const fixture = TestBed.createComponent(CardItem);
    fixture.componentRef.setInput('card', card);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  beforeEach(() => TestBed.configureTestingModule({ imports: [CardItem] }));

  it('shows the card image using the low quality webp url', () => {
    const el = render(makeCard({ image: 'https://example.com/card' }));
    expect(el.querySelector('img')?.getAttribute('src')).toBe('https://example.com/card/low.webp');
  });

  it('shows the card name', () => {
    const el = render(makeCard({ name: 'Pikachu' }));
    expect(el.querySelector('h3')?.textContent).toContain('Pikachu');
  });
});
