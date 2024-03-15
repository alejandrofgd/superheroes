import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Superheroes List', icon: 'label', url: './list'},
    { label: 'New Superhero', icon: 'add', url: './new-superhero'},
  ]
}
