import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroPageComponent } from './superhero-page.component';

describe('HeroPageComponent', () => {
  let component: SuperheroPageComponent;
  let fixture: ComponentFixture<SuperheroPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperheroPageComponent]
    });
    fixture = TestBed.createComponent(SuperheroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
