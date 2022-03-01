import { Component, OnDestroy, OnInit } from '@angular/core';
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

  onTrackToAdd() {
    console.log("add track");
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
        concatMap(() => this.loadAndSetTracks(this.person.id)
        )
      )
      .subscribe();


    console.log("track removed");
    console.log(track);
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
		this.unsubscribe$.complete();  
  }

}
