import { Pipe, PipeTransform } from '@angular/core';
import { Superhero } from '../../superheroes/interfaces/superhero.interface';

@Pipe({
  name: 'superheroImage'
})
export class SuperheroImagePipe implements PipeTransform {

  transform(superhero: Superhero): string {
    if (!superhero.id && !superhero.image) {
      return 'assets/no-image.jpg';
    }

    if (superhero.image) return superhero.image;

    return `assets/superheroes/${superhero.id}.jpg`;
  }

}
