import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CardBrief, CardSearchParams } from '../models/card.model';

const API_URL = 'https://api.tcgdex.net/v2/en';

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly http = inject(HttpClient);

  searchCards({
    name,
    hp,
    rarity,
    type,
    page = 1,
    pageSize = 20,
  }: CardSearchParams = {}): Observable<CardBrief[]> {
    let params = new HttpParams()
      .set('category', 'eq:Pokemon') // Regla de la app: solo mostramos cartas Pokémon (no Trainer ni Energy)
      .set('image', 'notnull:') // Regla de la app: solo cartas con imagen
      .set('pagination:page', page)
      .set('pagination:itemsPerPage', pageSize);

    const trimmedName = name?.trim();
    if (trimmedName) params = params.set('name', trimmedName);
    if (hp) params = params.set('hp', `eq:${hp}`);
    if (rarity) params = params.set('rarity', `eq:${rarity}`);
    if (type) params = params.set('types', type);

    return this.http.get<CardBrief[]>(`${API_URL}/cards`, { params });
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/types`);
  }

  getRarities(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/rarities`);
  }
}
