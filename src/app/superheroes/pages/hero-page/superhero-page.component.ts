import { Component, OnInit } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './superhero-page.component.html',
  styles: [
  ]
})
export class SuperheroPageComponent implements OnInit {

  public superhero?: Superhero;

  constructor(
    private superheroService: SuperheroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.superheroService.getSuperheroById(id),),
      )
      .subscribe(superhero => {

        if(!superhero) return this.router.navigate(['/superheroes/list'])

        this.superhero = superhero;
        return;
      })
  }

  goBack(): void {
    this.router.navigateByUrl('superheroes/list');
  }
}
