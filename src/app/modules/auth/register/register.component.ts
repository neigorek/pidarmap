import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisteredUserDto } from 'src/app/dtos-and-models';
import { AuthService } from 'src/app/services/auth.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorFields: string[] = [];
  isInvalid: boolean;
	get userName() { return this.registerForm.get('newUserName'); }
	get password() { return this.registerForm.get('password'); }
	get remember() { return this.registerForm.get('remember'); }
  
	@ViewChild('newUserNameInpup', { static: true }) newUserNameInpup: ElementRef;
	@ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  @ViewChild('rememberCheckbox', { static: true }) rememberCheckbox: ElementRef;
  
  constructor(
    private tokenManagerService: TokenManagerService,
    private authService: AuthService) { }

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

    this.authService
      .register(this.userName.value, this.password.value)
      .subscribe((registeredUser: RegisteredUserDto) => {
        this.isInvalid = false;
        this.errorFields = [];
        
        this.tokenManagerService.saveUserData(registeredUser.auth_token, registeredUser.id, registeredUser.username);
        if (this.remember.value == true) {
          this.tokenManagerService.saveRememberMe();
        }
      },
      (error) => {
        this.errorFields = [];
        this.errorFields.push(error.error);
        this.isInvalid = true;
      });
  }

}
