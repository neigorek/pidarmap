export interface PersonShortDto {
    id: string;
    name: string;
}

export interface TrackDto {
    id: string;
    address: string; 
    lng: number; // довгота
    lat: number; // широта
    azim: number; // азимут
    dateTime: Date; 
}

export interface GroupDto {
    id: string;
    name: string;
    description: string;
}

export interface PersonDto {
    id: string;
    name: string;
    description: string;
    shouldBeTracked: boolean;
}