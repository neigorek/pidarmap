import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();
  readonly tabs: string[] = ["mainDots", "groups"];
  currentTab: string = "mainDots";
  resetTab$: EventEmitter<string>;


  constructor() { 
    this.resetTab$ = new EventEmitter<string>();
  }

  ngOnInit(): void {

  }


  tabClick(tabName: string) {
    if (tabName == this.currentTab) {
      return;
    }
    if (!this.tabs.includes(tabName)) {
      return;
    }

    this.resetTab$.emit(tabName);
    this.currentTab = tabName; 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
		this.unsubscribe$.complete();  
  }

}
