import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOverview } from './ListOverview';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<ListOverview[]> {
    return this.httpClient.get<ListOverview[]>(environment.baseUrl);
  }
  create(title: string): Observable<void> {
    return this.httpClient.post<void>(environment.baseUrl, { title });
  }
}
