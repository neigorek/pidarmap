import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
		this.unsubscribe$.complete();  
  }

}
