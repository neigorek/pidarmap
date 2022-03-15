import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthorizedUserDto, RegisteredUserDto } from '../dtos-and-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private get serverUrl(): string {
    return environment.server_user;
  } 
  
  constructor(private http: HttpClient) { }

  private demoUser: AuthorizedUserDto = {
    id: 100,
    username: "Demo user",
    auth_token: "sdfsdf"
  };

  private registeredUser: RegisteredUserDto = {
    id: 200,
    username: "Some user",
    auth_token: "sdfsdf"
  };


  login(userName: string, password: string): Observable<AuthorizedUserDto> {
    if (!environment.production) {
      return of<AuthorizedUserDto>(this.demoUser)
    } 

    const url = this.serverUrl + "api-auth/login/";
    return this.http
      .post<AuthorizedUserDto>(url, {username: userName, password })
      .pipe(take(1));
  }

  register(userName: string, password: string): Observable<RegisteredUserDto> {
    if (!environment.production) {
      return of<RegisteredUserDto>(this.registeredUser)
    } 

    const url = this.serverUrl + "api-auth/register/";
    return this.http
      .post<RegisteredUserDto>(url, {username: userName, password })
      .pipe(take(1));
  }

  logout(): Observable<void> {
    if (!environment.production) {
      return of();
    } 

    const url = this.serverUrl + "api-auth/logout/";
    return this.http.get<any>(url).pipe(take(1));
  }
}
