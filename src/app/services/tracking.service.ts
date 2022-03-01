import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { personDto, trackDto } from '../models/dtos';


@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  // private serverUrl: string = environment.serverUrl; todo: use it when environment would contain valid url


  private persons: personDto[] = [
    {id: "1", name: "some person" },
    {id: "2", name: "stranger" },
    {id: "3", name: "another one" },
    {id: "4", name: "with very looong name" },
    {id: "5", name: "one more" },
  ]

  private tracks: trackDto[] = [
     {id: "1", address: "test address", azim: 100, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11) },
     {id: "2", address: "test very loong address", azim: 400, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11) },
     {id: "3", address: "test", azim: 150, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11) },
     {id: "4", address: "some address here", azim: 200, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11) },
     {id: "5", address: "Moskov", azim: 300, lat: 10.296032, lng: 70.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11) }
  ]
  
  constructor(
    private http: HttpClient) { }


    getPersons(): Observable<personDto[]> {

      return of<personDto[]>(this.persons)
    } 

  
    getTracks(): Observable<trackDto[]> {

      return of<trackDto[]>(this.tracks)
    }

    deleteTrack(track: trackDto): Observable<any> {

      return of<boolean>(true);
    }

    addTrack(track: trackDto): Observable<any> {

      return of<boolean>(true);
    }

    updatePersoneName(pesoneId: string, newName: string) : Observable<any> {

      return of<boolean>(true);
    }




}
