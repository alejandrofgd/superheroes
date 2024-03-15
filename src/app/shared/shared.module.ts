import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    SearchBoxComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    Error404PageComponent,
    SearchBoxComponent
  ]
})
export class SharedModule { }
