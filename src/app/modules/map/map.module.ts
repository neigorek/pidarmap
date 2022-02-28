import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { FormComponent } from './form/form.component';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FormComponent, MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYGBSNbyznwaneftYAdLoJdZIDQ3UEH1Y',
      libraries: ['drawing']
    }),
    ReactiveFormsModule,
  ]
})
export class MapModule { }
