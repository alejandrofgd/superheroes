import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPageComponent } from './list-page.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { of, throwError } from 'rxjs';
import { Superhero } from '../../interfaces/superhero.interface';
import { MaterialModule } from 'src/app/material/material.module';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let superheroesServiceSpy: jasmine.SpyObj<SuperheroesService>;

  beforeEach(async () => {
    const superheroesServiceSpyObj = jasmine.createSpyObj('SuperheroesService', ['getSuperheroes']);
    await TestBed.configureTestingModule({
      declarations: [ListPageComponent],
      imports: [MaterialModule],
      providers: [
        { provide: SuperheroesService, useValue: superheroesServiceSpyObj }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    superheroesServiceSpy = TestBed.inject(SuperheroesService) as jasmine.SpyObj<SuperheroesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter superheroes correctly', () => {
    const allSuperheroes: Superhero[] = [
      { superhero: 'Spider-Man', id: 'spiderman', realName: 'Peter Parker', aliases: '', publisher: '', alterEgos: '', firstAppearance: '' },
    ];

    component.allSuperheroes = allSuperheroes;

    component.filterSuperhero('Spider-Man');

    expect(component.superheroes).toEqual([allSuperheroes[0]]);
  });
});
