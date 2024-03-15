import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SuperheroImagePipe } from '../../pipes/superhero-image.pipe';
import { Superhero } from '../../interfaces/superhero.interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        SuperheroImagePipe],
      imports: [
        MaterialModule,
        RouterTestingModule]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.superhero = {
      id: '1',
      superhero: 'Superman',
      realName: 'Clark Kent',
      publisher: 'DC Comics',
      firstAppearance: '1950',
      alterEgos: '-',
      aliases: '-'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
