import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CardService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends name, type and pagination as query params', () => {
    service.searchCards({ name: ' pikachu ', type: 'Lightning', page: 2, pageSize: 4 }).subscribe();

    const req = http.expectOne((r) => r.url.endsWith('/cards'));
    expect(req.request.params.get('category')).toBe('eq:Pokemon');
    expect(req.request.params.get('image')).toBe('notnull:');
    expect(req.request.params.get('name')).toBe('pikachu');
    expect(req.request.params.get('types')).toBe('Lightning');
    expect(req.request.params.get('pagination:page')).toBe('2');
    expect(req.request.params.get('pagination:itemsPerPage')).toBe('4');
    req.flush([]);
  });
});
