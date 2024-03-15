import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, pipe } from 'rxjs';

import { Superhero } from '../interfaces/superhero.interface';
import { environments } from 'environments/environments';


@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(
    private http: HttpClient) { }

  getSuperheroes(): Observable<Superhero[]>{
    return this.http.get<Superhero[]>(`${this.baseUrl}/heroes`);
  }

  getSuperheroById(id: string): Observable<Superhero | undefined> {
    return this.http.get<Superhero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

  addSuperhero(superhero: Superhero): Observable<Superhero> {

    return this.http.post<Superhero>(`${this.baseUrl}/heroes`, superhero);
  }

  updateSuperhero(superhero: Superhero): Observable<Superhero> {
    if (!superhero.id) throw Error('Superhero ID is required');

    return this.http.patch<Superhero>(`${this.baseUrl}/heroes/${superhero.id}`, superhero);
  }

  deleteSuperheroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError( err => of(false))
      )
  }

}
