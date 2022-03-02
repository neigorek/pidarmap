import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrackingRoutingModule
  ],
  providers: []
})
export class TrackingModule { }
