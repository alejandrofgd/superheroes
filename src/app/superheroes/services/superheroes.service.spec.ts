import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from '../interfaces/superhero.interface';
import { environments } from 'environments/environments';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  let httpMock: HttpTestingController;
  let baseUrl: string = environments.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroesService]
    });

    service = TestBed.inject(SuperheroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve info for Captain America', () => {
    const captainAmerica: Superhero = {
      superhero: 'Captain America',
      id: '149-captain-america',
      realName: 'Steve Rogers',
      aliases: 'Sentinel of Liberty, Nomad, The Captain',
      publisher: 'Marvel Comics',
      alterEgos: 'No alter egos found',
      firstAppearance: 'Captain America Comics #1'
    };

    service.getSuperheroById('149-captain-america').subscribe(superhero => {
      expect(superhero).toEqual(captainAmerica);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/149-captain-america`);
    expect(req.request.method).toBe('GET');
    req.flush(captainAmerica);
  });

  it('should add a superhero', () => {
    const superhero: Superhero = {
      superhero: 'Superman',
      id: '1',
      realName: 'Clark Kent',
      aliases: 'Man of Steel',
      publisher: 'DC Comics',
      alterEgos: 'Kal-El',
      firstAppearance: 'Action Comics #1'
    };

    service.addSuperhero(superhero).subscribe(response => {
      expect(response).toEqual(superhero);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes`);
    expect(req.request.method).toBe('POST');
    req.flush(superhero);
  });

  it('should update a superhero', () => {
    const superhero: Superhero = {
      superhero: 'Batman',
      id: '2',
      realName: 'Bruce Wayne',
      aliases: 'The Dark Knight',
      publisher: 'DC Comics',
      alterEgos: 'None',
      firstAppearance: 'Detective Comics #27'
    };

    service.updateSuperhero(superhero).subscribe(response => {
      expect(response).toEqual(superhero);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/${superhero.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(superhero);
  });

  it('should delete a superhero', () => {
    const id = '1';

    service.deleteSuperheroById(id).subscribe(response => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get superheroes', () => {
    const superheroes: Superhero[] = [
      {
        superhero: 'Spider-Man',
        id: '3',
        realName: 'Peter Parker',
        aliases: 'Spidey',
        publisher: 'Marvel Comics',
        alterEgos: 'None',
        firstAppearance: 'Amazing Fantasy #15'
      },
      {
        superhero: 'Wonder Woman',
        id: '4',
        realName: 'Diana Prince',
        aliases: 'Princess Diana',
        publisher: 'DC Comics',
        alterEgos: 'None',
        firstAppearance: 'All Star Comics #8'
      }
    ];

    service.getSuperheroes().subscribe(response => {
      expect(response).toEqual(superheroes);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes`);
    expect(req.request.method).toBe('GET');
    req.flush(superheroes);
  });

});
