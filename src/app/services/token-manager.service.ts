import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  private tokenIdent: string = "user access token";
  private nameIdent: string = "user name";
  private rememberMeIdent: string = "remember me";

  private isLoggedIn: BehaviorSubject<boolean>;
  public loggerDetector: Observable<boolean>;


  get IsAuthorized(): boolean {
    return this.Token != null && this.UserName != null;
  }

  get Token(): string {
    return localStorage.getItem(this.tokenIdent);
  }

  get UserName(): string {
    return localStorage.getItem(this.nameIdent);
  }

  get LoginShouldBeRemembered(): boolean {
    return localStorage.getItem(this.rememberMeIdent) == "true";
  }

  constructor() { 
    this.isLoggedIn = new BehaviorSubject(this.IsAuthorized);
    this.loggerDetector = this.isLoggedIn.asObservable();
  }



  saveUserData(accessToken, userName): void {
    localStorage.setItem(this.tokenIdent, accessToken);
    localStorage.setItem(this.nameIdent, userName);
    this.isLoggedIn.next(true);
  }

  saveRememberMe() {
    localStorage.setItem(this.rememberMeIdent, "true");
  }
    
  clearUserData(): void {
    localStorage.removeItem(this.tokenIdent);
    localStorage.removeItem(this.nameIdent);
    localStorage.removeItem(this.rememberMeIdent);
    this.isLoggedIn.next(false);
  }

  
}
