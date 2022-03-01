export interface personDto {
    id: string;
    name: string;
}

export interface trackDto {
    id: string;
    address: string; 
    lng: number; // довгота
    lat: number; // широта
    azim: number; // азимут
    dateTime: Date; 
}