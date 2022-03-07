import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { DrgGroupsDto, GroupModel, GroupWithMonkeysDto, MonkeyDto, MonkeyWithGeolocationsDto, PersonModel, PersonShortModel, TrackModel } from '../dtos-and-models';
import { catchError } from 'rxjs/internal/operators/catchError';
import { DtoMapperService } from './dto-mapper.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private get serverUrl(): string {
    return environment.server_user;
  } 

  private shourtPersones: PersonShortModel[] = [
    {id: "1", name: "Кадиров", groupId: "1"  },
    {id: "2", name: "Шойгу", groupId: "1"  },
    {id: "3", name: "Стрєлков", groupId: "1"  },
    {id: "4", name: "Коля", groupId: "1"  },
    {id: "5", name: "Іван", groupId: "1"  },
    {id: "6", name: "Пушилін", groupId: "1"  }
  ]

  private persones: PersonModel[] = [
    {id: "1", name: "Кадиров", shouldBeTracked: true, description: "Головна мавпа на чечні", groupId: "1" },
    {id: "2", name: "Шойгу", shouldBeTracked: true, description: "Путінський лакей", groupId: "1" },
    {id: "3", name: "Стрєлков", shouldBeTracked: true, description: "Новоросійський ряжаний генерал", groupId: "1" },
    {id: "4", name: "Коля", shouldBeTracked: false, description: "Личичинка Лукашенка", groupId: "1" },
    {id: "5", name: "Іван", shouldBeTracked: false, description: "Танцор русскага балєта", groupId: "1" },
    {id: "6", name: "Пушилін", shouldBeTracked: true, description: "Вождь войовничих шахтьорів", groupId: "1" }
  ]

  private tracks: TrackModel[] = [
     {id: "1", address: "У сраці одного росіянського президента", azim: 100, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: true, description: "desc 1", personId: "6" },
     {id: "2", address: "В сирій земельці", azim: 400, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: true, description: "desc 1", personId: "6" },
     {id: "3", address: "В Києвському морі", azim: 150, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: false, description: "desc 1", personId: "6" },
     {id: "4", address: "На узбережжі азовського моря", azim: 200, lat: 50.296032, lng: 50.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: false, description: "desc 1", personId: "6" },
     {id: "5", address: "На дні Чорного моря біля острова Зміїний", azim: 300, lat: 10.296032, lng: 70.296032, dateTime: new Date(2022, 2, 20, 17, 23, 42, 11), shouldBeTracked: false, description: "desc 1", personId: "6" }
  ]
  
  private groups: GroupModel[] = [
    {id: "1", name: "Група Кадирова", description: "Чеченські уйобки, що палко прагнуть удобрити чорнозем.", shouldBeTracked: true},
    {id: "2", name: "Морська піхота під Одесою", description: "Кримнашисти, що от-от збунтуються.", shouldBeTracked: true },
    {id: "3", name: "Механізована група біля Сумм", description: "Бригада ВСР. Кандидати на здачу металолома.", shouldBeTracked: false},
    {id: "4", name: "Десант під Гостомелем", description: "'Елітна' вертолітна ударна група. З підрізаними крильцями.", shouldBeTracked: false},
    {id: "5", name: "Ракетна батарея над Харковом", description: "Штабні щури, що обстрілють цивільне населення з за кордона.", shouldBeTracked: true}
  ]

  constructor(
    private http: HttpClient,
    private mapper: DtoMapperService) { }

    // ---- short persones START

    getShortPersones(): Observable<PersonShortModel[]> {
      if (!environment.production) {
        return of<PersonShortModel[]>(this.shourtPersones)
      } 

      const url = this.serverUrl + "api/monkeys/active/";
      return this.http
        .get<MonkeyDto[]>(url)
        .pipe(map(monkeys => monkeys.map(this.mapper.mapMonkeyToPerson)));
    } 


    updatePersoneName(person: PersonModel) : Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  `api/monkeys/${person.id}/`;
      return this.http
        .patch<any>(url, {data: this.mapper.mapPersonToMonkey(person)})
    }

    // ---- short persones END





    // ---- tracks START

    getTracks(personId: string): Observable<TrackModel[]> {
      if (!environment.production) {
        return of<TrackModel[]>(this.tracks)
      }

      const url = this.serverUrl +  `api/monkeys/${personId}/`;
      return this.http
        .get<MonkeyWithGeolocationsDto>(url)
        .pipe(map(monkey => monkey.geolocations.map(this.mapper.mapGeolocaionToTrack)));
    }

    addTrack(track: TrackModel): Observable<any> { 
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  `api/geolocations/${track.personId}/`;
      return this.http
        .post<any>(url, {data: this.mapper.mapTrackToGeolocation(track) });
    }

    toggleTrackTracking(track: TrackModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  `api/geolocations/${track.id}/`;
      return this.http
        .patch<any>(url, {data: this.mapper.mapTrackToGeolocation(track)})
    }

    // ---- tracks END




    // ---- groups START

    getGroups(): Observable<GroupModel[]> {
      if (!environment.production) {
        return of<GroupModel[]>(this.groups)
      }

      const url = this.serverUrl +  'api/drggroups/active';
      return this.http
        .get<DrgGroupsDto[]>(url)
        .pipe(map(groups => groups.map(this.mapper.mapDrgGroupToGroup)));
    }

    addGroup(group: GroupModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  'api/drggroups/';
      return this.http
        .post<any>(url, {data: this.mapper.mapGroupToDrgGroup(group) });
    }

    updateGroupNameAndDescription(group: GroupModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  `api/drggroups/${group.id}`;
      return this.http
        .patch<any>(url, {data: this.mapper.mapGroupToDrgGroup(group)})
    }

    toggleGroupTracking(group: GroupModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  'api/drggroups/change_status/';
      return this.http
        .patch<any>(url, {data: this.mapper.mapGroupToDrgGroup(group)})
    }

    // ---- groups END





    // ---- persones START

    getPersones(groupId: string): Observable<PersonModel[]> {
      if (!environment.production) {
        return of<PersonModel[]>(this.persones);
      }

      const url = this.serverUrl +  `api/drggroups/${groupId}/`;
      return this.http
        .get<GroupWithMonkeysDto>(url)
        .pipe(map(group => group.monkeys.map(this.mapper.mapMonkeyToPerson)));
    } 

    addPerson(person: PersonModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  'api/monkeys/';
      return this.http
        .post<any>(url, {data: this.mapper.mapPersonToMonkey(person) });
    }

    updatePersonNameAndDescription(person: PersonModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  `api/monkeys/${person.id}/`;
      return this.http
        .patch<any>(url, {data: this.mapper.mapPersonToMonkey(person)});
    }

    togglePersonTracking(person: PersonModel): Observable<any> {
      if (!environment.production) {
        return of<boolean>(true);
      }

      const url = this.serverUrl +  'api/monkeys/change_status/';
      return this.http
        .patch<any>(url, {data: this.mapper.mapPersonToMonkey(person)});
    }

    // ---- persones END
}
