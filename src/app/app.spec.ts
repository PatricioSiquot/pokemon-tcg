import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { makeCard } from './testing/card.fixtures';
import { App } from './app';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function setup() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const req = http.expectOne((r) => r.url.endsWith('/cards'));
    return { fixture, req, el: () => fixture.nativeElement as HTMLElement };
  }

  it('shows the loading state while the request is pending', () => {
    const { el, req } = setup();
    expect(el().querySelector('[role="status"]')?.textContent).toContain('Loading');
    req.flush([]);
  });

  it('shows the cards when the request succeeds', () => {
    const { fixture, req, el } = setup();
    req.flush([makeCard({ id: 'a' }), makeCard({ id: 'b' })]);
    fixture.detectChanges();
    expect(el().querySelectorAll('app-card-item').length).toBe(2);
  });

  it('shows an empty message when there are no cards', () => {
    const { fixture, req, el } = setup();
    req.flush([]);
    fixture.detectChanges();
    expect(el().textContent).toContain('No cards found');
  });

  it('shows an error message when the request fails', () => {
    const { fixture, req, el } = setup();
    req.error(new ProgressEvent('error'));
    fixture.detectChanges();
    expect(el().querySelector('[role="alert"]')).not.toBeNull();
  });
});
