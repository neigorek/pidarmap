// models

export interface PersonShortModel {
    id: string;
    name: string;
    groupId: string;
}

export interface TrackModel {
    id: string;
    address: string; 
    lng: number; // довгота
    lat: number; // широта
    azim: number; // азимут
    dateTime: Date;
    shouldBeTracked: boolean;
    description: string;
    personId: string;
}

export interface GroupModel {
    id: string;
    name: string;
    description: string;
    shouldBeTracked: boolean;
}

export interface PersonModel {
    id: string;
    name: string;
    description: string;
    shouldBeTracked: boolean;
    groupId: string;
}



// dtos

export interface MonkeyDto {
    id: number;
    name: string;
    group: number;
    description: string;
    is_active: boolean;
}

export interface MonkeyWithGeolocationsDto {
    id: number;
    geolocations: GeolocationDto[];
}

export interface GeolocationDto {
    id: number;
    monkey: number;
    desc: string;
    datetime: number;
    address: string;
    longitude: string;
    latitude: string;
    azimuth: string;
    is_active: boolean;
}

export interface DrgGroupsDto {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
}

export interface GroupWithMonkeysDto {
    id: number;
    monkeys: MonkeyDto[];
}

export interface MonkeyDto {
    id: number;
    name: string;
    group: number;
    description: string;
    is_active: boolean;
}

export interface AuthorizedUserDto {
    id: number;
    username: string;
    auth_token: string;
}

export interface RegisteredUserDto {
    id: number;
    username: string;
    auth_token: string;
}