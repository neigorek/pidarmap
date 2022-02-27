import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form = this.fb.group({
    lng: this.fb.control(this.service.form.get('lng').value),
    lat: this.fb.control(this.service.form.get('lat').value),
    azim: this.fb.control(this.service.form.get('azim').value),
  });

  constructor(public service: ServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.service.setVal(this.form.value);
  }

}
