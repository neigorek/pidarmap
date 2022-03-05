import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { GroupDto, PersonDto, PersonShortDto, TrackDto } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  // private serverUrl: string = environment.serverUrl; todo: use it when environment would contain valid url


  private shourtPersones: PersonShortDto[] = [
    {id: "1", name: "Кадиров" },
    {id: "2", name: "Шойгу" },
    {id: "3", name: "Стрєлков" },
    {id: "4", name: "Коля" },
    {id: "5", name: "Іван" },
    {id: "6", name: "Пушилін" },
  ]

  private persones: PersonDto[] = [
    {id: "1", name: "Кадиров", shouldBeTracked: true, description: "Головна мавпа на чечні" },
    {id: "2", name: "Шойгу", shouldBeTracked: true, description: "Путінський лакей" },
    {id: "3", name: "Стрєлков", shouldBeTracked: true, description: "Новоросійський ряжаний генерал" },
    {id: "4", name: "Коля", shouldBeTracked: false, description: "Личичинка Лукашенка" },
    {id: "5", name: "Іван", shouldBeTracked: false, description: "Танцор русскага балєта" },
    {id: "6", name: "Пушилін", shouldBeTracked: true, description: "Вождь войовничих шахтьорів" },
  ]

  private tracks: TrackDto[] = [
     {id: "1", address: "У сраці одного росіянського президента", azim: 100, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: true },
     {id: "2", address: "В сирій земельці", azim: 400, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: true },
     {id: "3", address: "В Києвському морі", azim: 150, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: false },
     {id: "4", address: "На узбережжі азовського моря", azim: 200, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: false },
     {id: "5", address: "На дні Чорного моря біля острова Зміїний", azim: 300, lat: 10.296032, lng: 70.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: false }
  ]
  
  private groups: GroupDto[] = [
    {id: "1", name: "Група Кадирова", description: "Чеченські уйобки, що палко прагнуть удобрити чорнозем.", shouldBeTracked: true},
    {id: "2", name: "Морська піхота під Одесою", description: "Кримнашисти, що от-от збунтуються.", shouldBeTracked: true },
    {id: "3", name: "Механізована група біля Сумм", description: "Бригада ВСР. Кандидати на здачу металолома.", shouldBeTracked: false},
    {id: "4", name: "Десант під Гостомелем", description: "'Елітна' вертолітна ударна група. З підрізаними крильцями.", shouldBeTracked: false},
    {id: "5", name: "Ракетна батарея над Харковом", description: "Штабні щури, що обстрілють цивільне населення з за кордона.", shouldBeTracked: true}
  ]
  constructor(
    private http: HttpClient) { }


    getShortPersones(): Observable<PersonShortDto[]> {

      return of<PersonShortDto[]>(this.shourtPersones)
    } 

    getPersones(groupId: string): Observable<PersonDto[]> {

      return of<PersonDto[]>(this.persones)
    } 

    getGroups(): Observable<GroupDto[]> {

      return of<GroupDto[]>(this.groups)
    }

  
    getTracks(personId: string): Observable<TrackDto[]> {

      return of<TrackDto[]>(this.tracks)
    }

    deleteGroup(groupId: string): Observable<any> {

      return of<boolean>(true);
    }


    addTrack(track: TrackDto, personId: string): Observable<any> {

      return of<boolean>(true);
    }

    addGroup(group: GroupDto): Observable<any> {
      
      return of<boolean>(true);
    }

    addPerson(person: PersonDto, groupId: string): Observable<any> {
      
      return of<boolean>(true);
    }

    updatePersoneName(pesoneId: string, newName: string) : Observable<any> {

      return of<boolean>(true);
    }

    updateGroupNameAndDescription(group: GroupDto): Observable<any> {

      return of<boolean>(true);
    }

    updateNameNameAndDescription(person: PersonDto): Observable<any> {

      return of<boolean>(true);
    }

    toggleGroupTracking(groupId: string, hide: boolean): Observable<any> {
      
      return of<boolean>(true);
    }

    togglePersonTracking(personId: string, hide: boolean): Observable<any> {
      
      return of<boolean>(true);
    }

    toggleTrackTracking(trackId: string, hide: boolean): Observable<any> {
      
      return of<boolean>(true);
    }




}
