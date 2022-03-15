import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizedUserDto } from 'src/app/dtos-and-models';
import { AuthService } from 'src/app/services/auth.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorFields: string[] = [];
  isInvalid: boolean;
	get userName() { return this.loginForm.get('userName'); }
	get password() { return this.loginForm.get('password'); }
	get remember() { return this.loginForm.get('remember'); }
  
	@ViewChild('userNameInpup', { static: true }) userNameInpup: ElementRef;
	@ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  @ViewChild('rememberCheckbox', { static: true }) rememberCheckbox: ElementRef;
  

  constructor(
    private tokenManagerService: TokenManagerService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
			'userName': new FormControl('', [Validators.required]),
			'password': new FormControl('', [Validators.required]),
      'remember': new FormControl(''),
		});
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login(this.userName.value, this.password.value)
      .subscribe((authorizedUser: AuthorizedUserDto) => {
        this.isInvalid = false;
        this.errorFields = [];

        this.tokenManagerService.saveUserData(authorizedUser.auth_token, authorizedUser.id, authorizedUser.username);
        if (this.remember.value == true) {
          this.tokenManagerService.saveRememberMe();
        }
      },
      (error) => {
        this.errorFields = [];
        error.error.forEach(err => {
          this.errorFields.push(err);
        });
        this.isInvalid = true;
      });
  }
}
