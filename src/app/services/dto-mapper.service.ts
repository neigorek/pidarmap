import { Injectable } from '@angular/core';
import { DrgGroupsDto, GeolocationDto, GroupModel, MonkeyDto, PersonModel, TrackModel } from '../dtos-and-models';

@Injectable({
  providedIn: 'root'
})
export class DtoMapperService {

  constructor() { }


  mapMonkeyToPerson(monkey: MonkeyDto): PersonModel {
    return {
      id: monkey.id.toString(),
      name: monkey.name,
      groupId: monkey.group.toString(),
      shouldBeTracked: monkey.is_active,
      description: monkey.description
    } as PersonModel;
  }

  mapPersonToMonkey(person: PersonModel): MonkeyDto {
    return {
      id: +person.id,
      name: person.name,
      description: person.description,
      group: +person.groupId,
      is_active: person.shouldBeTracked
    } as MonkeyDto
  }

  mapGeolocaionToTrack(geolocaion: GeolocationDto): TrackModel {
    return {
      id: geolocaion.id.toString(),
      address: geolocaion.address,
      azim: +geolocaion.azimuth,
      lat: +geolocaion.latitude,
      lng: +geolocaion.latitude,
      shouldBeTracked: geolocaion.is_active,
      dateTime: new Date(geolocaion.datetime),
      description: geolocaion.desc
    } as TrackModel;
  }

  mapTrackToGeolocation(track: TrackModel): GeolocationDto {
    return {
      id: +track.id,
      address: track.address,
      azimuth: track.azim.toString(),
      latitude: track.lat.toString(),
      longitude: track.lng.toString(),
      is_active: track.shouldBeTracked,
      desc: track.description,
      datetime: track.dateTime.getTime(),
      monkey: +track.personId
    } as GeolocationDto;
  }

  mapDrgGroupToGroup(drg: DrgGroupsDto): GroupModel {
    return {
      id: drg.id.toString(),
      name: drg.name,
      description: drg.description,
      shouldBeTracked: drg.is_active
    } as GroupModel
  }

  mapGroupToDrgGroup(group: GroupModel): DrgGroupsDto {
    return {
      id: +group.id,
      is_active: group.shouldBeTracked,
      description: group.description,
      name: group.name
    } as DrgGroupsDto
  }

}
