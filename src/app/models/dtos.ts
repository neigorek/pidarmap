export interface PersonShortDto {
    id: string;
    name: string;
    groupId: string;
}

export interface TrackDto {
    id: string;
    address: string; 
    lng: number; // довгота
    lat: number; // широта
    azim: number; // азимут
    dateTime: Date;
    shouldBeTracked: boolean;
}

export interface GroupDto {
    id: string;
    name: string;
    description: string;
    shouldBeTracked: boolean;
}

export interface PersonDto {
    id: string;
    name: string;
    description: string;
    shouldBeTracked: boolean;
    groupId: string;
}