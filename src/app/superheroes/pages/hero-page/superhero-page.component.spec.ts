import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SuperheroPageComponent } from './superhero-page.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuperheroPageComponent', () => {
  let component: SuperheroPageComponent;
  let fixture: ComponentFixture<SuperheroPageComponent>;
  let superheroesServiceSpy: jasmine.SpyObj<SuperheroesService>;
  let routerSpy: { navigateByUrl: jasmine.Spy };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SuperheroesService', ['getSuperheroById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [SuperheroPageComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '149-captain-america' })
          }
        },
        { provide: SuperheroesService, useValue: spy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    superheroesServiceSpy = TestBed.inject(SuperheroesService) as jasmine.SpyObj<SuperheroesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate method when goBack is called', () => {
    component.goBack();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('superheroes/list');
  });
});
