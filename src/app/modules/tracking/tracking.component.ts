import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TrackingService } from 'src/app/services/tracking.service';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { personDto, trackDto } from 'src/app/models/dtos';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();


  persons: personDto[];
  person: personDto;
  tracks: trackDto[];

  @ViewChild('addressField', { static: false }) addressField: ElementRef;
  @ViewChild('lngField', { static: false }) lngField: ElementRef;
  @ViewChild('latField', { static: false }) latField: ElementRef;
  @ViewChild('azimField', { static: false }) azimField: ElementRef;
  @ViewChild('dismissButton', { static: false }) dismissButton: ElementRef;

  


  constructor(private trackingServics: TrackingService) { }

  ngOnInit(): void {
    this.loadAndSetPersons().subscribe();

  }


  onPersonSelected(person: personDto): void {
    console.log(person);
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

  onTrackSelected(track: trackDto): void {
    console.log(track);
  }

  onTrackToAdd(shouldAdd: boolean): void {
    if (!shouldAdd) {
      return;
    }

    const newTrack: trackDto = {
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
      .subscribe();

    this.dismissButton.nativeElement.click();
    this.resetAddTrackModalFields();
  }

  onTrackDeleted(track: trackDto) {
    const result = confirm(`Видалити трек ${track.id}?`);
    if (!result) {
      return;
    }

    this.trackingServics
      .deleteTrack(track)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetTracks(this.person.id))
      )
      .subscribe();
  }
 

  private loadAndSetTracks(personId: string): Observable<void> {
    return this.trackingServics
      .getTracks()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((personResponse: trackDto[]) => { 
          this.tracks = personResponse;
        })
      );
  }

  private loadAndSetPersons(): Observable<void> {
    return this.trackingServics
      .getPersons()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((personResponse: personDto[]) => { 
          this.persons = personResponse;
        })
      );
  }

  private resetAddTrackModalFields() {
    this.addressField.nativeElement.value = '';
    this.azimField.nativeElement.value = '';
    this.latField.nativeElement.value = '';
    this.lngField.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
		this.unsubscribe$.complete();  
  }

}
