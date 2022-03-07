import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
	get userName() { return this.registerForm.get('newUserName'); }
	get password() { return this.registerForm.get('password'); }
	get remember() { return this.registerForm.get('remember'); }
  
	@ViewChild('newUserNameInpup', { static: true }) newUserNameInpup: ElementRef;
	@ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  @ViewChild('rememberCheckbox', { static: true }) rememberCheckbox: ElementRef;
  
  constructor(private tokenManagerService: TokenManagerService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
			'newUserName': new FormControl('', [Validators.required]),
			'password': new FormControl('', [Validators.required]),
      'remember': new FormControl(''),
		});

  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    // todo: send server request 
    this.tokenManagerService.saveUserData(this.password.value, this.userName.value);
    if (this.remember.value == true) {
      this.tokenManagerService.saveRememberMe();
    }
  }

}
