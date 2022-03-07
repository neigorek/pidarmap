import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
	get userName() { return this.loginForm.get('userName'); }
	get password() { return this.loginForm.get('password'); }
	get remember() { return this.loginForm.get('remember'); }
  
	@ViewChild('userNameInpup', { static: true }) userNameInpup: ElementRef;
	@ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  @ViewChild('rememberCheckbox', { static: true }) rememberCheckbox: ElementRef;
  
  constructor(private tokenManagerService: TokenManagerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
			'userName': new FormControl('', [Validators.required]),
			'password': new FormControl('', [Validators.required]),
      'remember': new FormControl(''),
		});

  }


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    // todo: send server request 
    this.tokenManagerService.saveUserData(this.password.value, this.userName.value);
    if (this.remember.value == true) {
      this.tokenManagerService.saveRememberMe();
    }
  }
}
