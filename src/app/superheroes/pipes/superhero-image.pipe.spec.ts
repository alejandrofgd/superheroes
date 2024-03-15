import { SuperheroImagePipe } from './superhero-image.pipe';
import { Superhero } from '../../superheroes/interfaces/superhero.interface';

describe('SuperheroImagePipe', () => {
  let pipe: SuperheroImagePipe;

  beforeEach(() => {
    pipe = new SuperheroImagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform superhero with id and image', () => {
    const superhero: Superhero = {
      id: '1',
      superhero: 'Spider-Man',
      realName: 'Peter Parker',
      aliases: '',
      publisher: '',
      alterEgos: '',
      firstAppearance: '',
      image: 'spiderman.jpg'
    };
    const transformed = pipe.transform(superhero);
    expect(transformed).toEqual('spiderman.jpg');
  });

  it('should transform superhero without image', () => {
    const superhero: Superhero = {
      id: '1',
      superhero: 'Spider-Man',
      realName: 'Peter Parker',
      aliases: '',
      publisher: '',
      alterEgos: '',
      firstAppearance: ''
    };
    const transformed = pipe.transform(superhero);
    expect(transformed).toEqual('assets/superheroes/1.jpg');
  });

});
