import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TrackingService } from 'src/app/services/tracking.service';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { PersonShortDto, TrackDto } from 'src/app/models/dtos';
@Component({
  selector: 'app-main-dots',
  templateUrl: './main-dots.component.html',
  styleUrls: ['./main-dots.component.css']
})
export class MainDotsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  persones: PersonShortDto[];
  person: PersonShortDto;
  tracks: TrackDto[];

  @ViewChild('addressField', { static: false }) addressField: ElementRef;
  @ViewChild('lngField', { static: false }) lngField: ElementRef;
  @ViewChild('latField', { static: false }) latField: ElementRef;
  @ViewChild('azimField', { static: false }) azimField: ElementRef;

  @ViewChild('dismissButtonForAddTrackModal', { static: false }) dismissButtonForAddTrackModal: ElementRef;
  @ViewChild('personNameField', { static: false }) personNameField: ElementRef;
  @ViewChild('dismissButtonForChangeNameModal', { static: false }) dismissButtonForChangeNameModal: ElementRef;

  @Input() resetPage: EventEmitter<string>;

  constructor(private trackingServics: TrackingService) { }

  ngOnInit(): void {
    this.loadAndSetPersones().subscribe();
    this.resetPage.subscribe((pageName: string) => {
      if (pageName != "mainDots") {
        return;
      }

      this.persones = null;
      this.person = null;
      this.tracks = null;
      this.loadAndSetPersones().subscribe();
    });
  }


  onPersonSelected(person: PersonShortDto): void {
    if (this.person) {
      if (this.person.id == person.id) {
        this.person = null;
        this.tracks = null;
        return;
      }
    }
    this.person = person;
    this.loadAndSetTracks(this.person.id).subscribe();
  }

  onTrackSelected(track: TrackDto): void {
    console.log(track);
  }


  onTrackToAdd(shouldAdd: boolean): void {
    if (!shouldAdd) {
      return;
    }

    const newTrack: TrackDto = {
      address: this.addressField.nativeElement.value,
      lat: this.latField.nativeElement.value,
      lng: this.lngField.nativeElement.value,
      azim: this.azimField.nativeElement.value,
      dateTime: new Date(),
      id: ''
    };

    this.trackingServics
      .addTrack(newTrack)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetTracks(this.person.id))
      )
      .subscribe(() => {
        this.dismissButtonForAddTrackModal.nativeElement.click();
        this.resetAddTrackModalFields();
      });
  }


  onTrackDeleted(track: TrackDto) {
    const result = confirm(`Видалити трек: ${track.address} | ${track.lat} ${track.lat} ${track.azim}?`);
    if (!result) {
      return;
    }

    this.trackingServics
      .deleteTrack(track.id)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetTracks(this.person.id))
      )
      .subscribe();
  }
 

  onPersonNameModalToOpen(person: PersonShortDto): void {
    this.personNameField.nativeElement.value = person.name;
  }


  onPersonNameToChange(shouldChange: boolean): void {
    if (!shouldChange) {
      return;
    }

    if ( this.personNameField.nativeElement.value === this.person.name) {
      this.dismissButtonForChangeNameModal.nativeElement.click();
      this.resetChangePersonNameModalFields();
      return;
    }

    this.trackingServics
      .updatePersoneName(this.person.id, this.personNameField.nativeElement.value)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetPersones())
      )
      .subscribe(() => {
        this.dismissButtonForChangeNameModal.nativeElement.click();
        this.resetChangePersonNameModalFields();
        this.person = null;
      });
  }



  private loadAndSetTracks(personId: string): Observable<void> {
    return this.trackingServics
      .getTracks(personId)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((trackResponse: TrackDto[]) => { 
          this.tracks = trackResponse;
        })
      );
  }

  private loadAndSetPersones(): Observable<void> {
    return this.trackingServics
      .getShortPersones()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((personesResponse: PersonShortDto[]) => { 
          this.persones = personesResponse;
        })
      );
  }

  private resetAddTrackModalFields() {
    this.addressField.nativeElement.value = '';
    this.azimField.nativeElement.value = '';
    this.latField.nativeElement.value = '';
    this.lngField.nativeElement.value = '';
  }

  private resetChangePersonNameModalFields() {
    this.personNameField.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
		this.unsubscribe$.complete();  
  }

}
