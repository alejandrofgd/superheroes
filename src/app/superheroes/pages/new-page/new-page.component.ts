import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SuperheroesService } from '../../services/superheroes.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public superheroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<string>(''),
    alterEgo:        new FormControl<string>(''),
    firstAppearance: new FormControl<string>(''),
    aliases:        new FormControl<string>(''),
    image:          new FormControl<string>(''),
  })

  constructor(
    private superheroesService: SuperheroesService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedroute.params
      .pipe(
        switchMap(({id}) => this.superheroesService.getSuperheroById(id)),
      ).subscribe(superhero => {
        if (!superhero) return this.router.navigateByUrl('/');

        this.superheroForm.reset(superhero);
        return;
      })
  }

  get currentSuperhero(): Superhero {
    const superhero = this.superheroForm.value as Superhero;
    return superhero;
  }

  onSubmit(): void {

    if (this.superheroForm.invalid) return;

    if (this.currentSuperhero.id) {
      this.superheroesService.updateSuperhero(this.currentSuperhero)
        .subscribe( superhero => {
          this.showSnackBar('Superhero updated')
        })
      return;
    }

    this.superheroesService.addSuperhero(this.currentSuperhero)
      .subscribe( superhero => {
        this.showSnackBar('Superhero created')
        this.router.navigate(['/heroes/edit', superhero.id])
      })
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'Done', {
      duration: 2500,
    });
  }
}
