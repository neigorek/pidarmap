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
    lng: this.fb.control(''),
    lat: this.fb.control(''),
    azim: this.fb.control(''),
  });

  constructor(public service: ServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.service.setVal(this.form.value);
  }

}
