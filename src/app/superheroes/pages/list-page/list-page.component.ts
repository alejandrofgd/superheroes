import { Component, OnInit } from '@angular/core';
import { Superhero } from '../../interfaces/superhero.interface';
import { SuperheroesService } from '../../services/superheroes.service';
import { Observable, catchError, of, tap, delay } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public allSuperheroes: Superhero[] = [];
  public superheroes: Superhero[] = [];
  data?: Observable<string | Superhero[]>;

  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private superheroesService: SuperheroesService) {}

  ngOnInit(): void {
    if (this.superheroesService.getSuperheroes()) {
      this.data = this.superheroesService.getSuperheroes().pipe(
        // DELAY ONLY FOR SPINNER DEMONSTRATION
        // delay(1000),
        tap(data => {
          this.allSuperheroes = data;
          this.superheroes = data;
        }),
        catchError(error => {
          console.error('Error getting superheroes data:', error);
          return of([]);
        })
      );
    }
  }

  filterSuperhero( term: string) {

    if (!term) {
      this.superheroes = this.allSuperheroes;
    } else {
      term = term.toLowerCase();
      this.superheroes = this.allSuperheroes.filter(superhero => {
        return superhero.superhero.toLowerCase().includes(term)
      });
    }

  }
}
