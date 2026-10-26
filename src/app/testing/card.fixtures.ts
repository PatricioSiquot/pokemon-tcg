import { CardBrief } from '../models/card.model';

export function makeCard(overrides: Partial<CardBrief> = {}): CardBrief {
  return {
    id: 'test-1',
    localId: '1',
    name: 'Test Card',
    image: 'https://example.com/card',
    ...overrides,
  };
}
