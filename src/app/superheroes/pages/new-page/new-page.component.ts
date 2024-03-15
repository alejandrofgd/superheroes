import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, of, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { SuperheroesService } from '../../services/superheroes.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

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
    realName:        new FormControl<string>(''),
    firstAppearance: new FormControl<string>(''),
    aliases:        new FormControl<string>(''),
    image:          new FormControl<string>(''),
  })

  constructor(
    private superheroesService: SuperheroesService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) {}

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
          this.showSnackBar('Superhero updated');
          this.router.navigate(['/superheroes']);
        },
        error => {
          const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
            data: error,
          });

        })
      return;
    }

    this.currentSuperhero.id = this.currentSuperhero.superhero.replace(/\s+/g, '-').toLowerCase();

    this.superheroesService.addSuperhero(this.currentSuperhero)
      .subscribe( superhero => {
        this.showSnackBar('Superhero created')
        this.router.navigate(['/superheroes']);
      },
      error => {
        const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
          data: error,
        });

      })
  }

  onDeleteHero() {
    if (!this.currentSuperhero.id) throw Error("Superhero ID is required");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.superheroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.superheroesService.deleteSuperheroById(this.currentSuperhero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
        catchError(error => {
              const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
                data: error,
              });
              return of([]);
            }
          )
      )
      .subscribe(() => {
        this.showSnackBar('Superhero deleted')
        this.router.navigate(['/superheroes']);
      })
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'Done', {
      duration: 2500,
    });
  }
}
