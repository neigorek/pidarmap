import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { FormComponent } from './components/form/form.component';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByOQ1tHFjLrXlYtDVUAqI5WRNUzNZZtsE',
      libraries: ['drawing']
    }),
    ReactiveFormsModule
  ],
  // 'AIzaSyDNeN8YV1ZZokvngbeNOBEsFvh74RElXUA'
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
