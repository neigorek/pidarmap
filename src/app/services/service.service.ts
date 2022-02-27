import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public form = this.fb.group({
    lng: this.fb.control(30.721376),
    lat: this.fb.control(50.296032),
    azim: this.fb.control(100),
  });
  constructor(private fb: FormBuilder) { }

  get lng(): AbstractControl {
    return this.form.get('lng');
  }

  get lat(): AbstractControl {
    return this.form.get('lat');
  }

  get azim(): AbstractControl {
    return this.form.get('azim');
  }

  setLng(value): void {
    this.lng.setValue(value);
  }

  setLat(value): void {
    this.lat.setValue(value);
  }

  setAzim(value): void {
    this.azim.setValue(value);
  }

  setVal($event): void {
    this.setLng(+$event.lng);
    this.setLat(+$event.lat);
    this.setAzim(+$event.azim);
  }
}
