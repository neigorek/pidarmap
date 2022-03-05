import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { GroupDto, PersonDto } from 'src/app/models/dtos';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  @ViewChild('editGroupNameField', { static: false }) editGroupNameField: ElementRef;
  @ViewChild('editGroupDescriptionField', { static: false }) editGroupDescriptionField: ElementRef;
  @ViewChild('dismissButtonForChangeGroupNameModal', { static: false }) dismissButtonForChangeGroupNameModal: ElementRef;

  @ViewChild('editPersonNameFromGroupPageField', { static: false }) editPersonNameFromGroupPageField: ElementRef;
  @ViewChild('editPersonDescriptionFromGroupPageField', { static: false }) editPersonDescriptionFromGroupPageField: ElementRef;
  @ViewChild('dismissButtonForChangePersonDescripitonModal', { static: false }) dismissButtonForChangePersonDescripitonModal: ElementRef;

  @ViewChild('addGroupNameField', { static: false }) addGroupNameField: ElementRef;
  @ViewChild('addGroupDescriptionField', { static: false }) addGroupDescriptionField: ElementRef;
  @ViewChild('dismissButtonForNewGroupModal', { static: false }) dismissButtonForNewGroupModal: ElementRef;

  @ViewChild('addPersonNameField', { static: false }) addPersonNameField: ElementRef;
  @ViewChild('addPersonDescriptionField', { static: false }) addPersonDescriptionField: ElementRef;
  @ViewChild('dismissButtonForNewPersonModal', { static: false }) dismissButtonForNewPersonModal: ElementRef;

  groups: GroupDto[];
  group: GroupDto;
  persones: PersonDto[];
  person: PersonDto;

  @Input() resetPage: EventEmitter<string>;

  constructor(private trackingService: TrackingService) { }

  ngOnInit(): void {
    this.loadAndSetGroups().subscribe();
    this.resetPage.subscribe((pageName: string) => {
      if (pageName != "groups") {
        return;
      }

      this.groups = null;
      this.group = null;
      this.persones = null;
      this.person = null;
      this.loadAndSetGroups().subscribe();
    });
  }

  toggleGroupTracking(group: GroupDto) {
    this.trackingService
      .togglePersonTracking(group.id, group.shouldBeTracked)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

      console.log(group);
    if (group == this.group) {
      this.person = null;
      this.persones = null;
      this.loadAndSetPersones(this.group.id).subscribe();
    }
  }

  togglePersonTracking(person: PersonDto){
    this.trackingService
      .togglePersonTracking(person.id, person.shouldBeTracked)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

      if (person == this.person) {
        this.person = null;
        this.persones = null;
        this.loadAndSetPersones(this.group.id).subscribe();
      }
  }
 
  onPersonToAdd(shouldAdd: boolean) {
    if (!shouldAdd) {
      return;
    }

    const newPerson: PersonDto = {
      name: this.addPersonNameField.nativeElement.value,
      description: this.addPersonDescriptionField.nativeElement.value,
      id: '',
      shouldBeTracked: true
    };

    this.trackingService
      .addPerson(newPerson, this.group.id)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetPersones(this.group.id))
      )
      .subscribe(() => {
        this.dismissButtonForNewPersonModal.nativeElement.click();
        this.resetNewPersonModalFields();
        this.person = null;
      });

  }

  onGroupToAdd(shouldAdd: boolean) {
    if (!shouldAdd) {
      return;
    }

    const newGroup: GroupDto = {
      name: this.addGroupNameField.nativeElement.value,
      description: this.addGroupDescriptionField.nativeElement.value,
      shouldBeTracked: true,
      id: ''
    };

    this.trackingService
      .addGroup(newGroup)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetGroups())
      )
      .subscribe(() => {
        this.dismissButtonForNewGroupModal.nativeElement.click();
        this.resetNewGroupModalFields();
        this.group = null;
        this.person = null;
        this.persones = null;
      });
  }

  onPersonSelected(person: PersonDto): void {
    if (this.person) {
      if (this.person.id == person.id) {
        this.person = null;
        return;
      }
    }
    this.person = person;
  }

  onPersonChangeDescriptionModalToOpen(person: PersonDto): void {
    this.editPersonNameFromGroupPageField.nativeElement.value = person.name;
    this.editPersonDescriptionFromGroupPageField.nativeElement.value = person.description;
  }

  onPersonNameToChangeFromGroupPage(shouldChange: boolean): void {
    if (!shouldChange) {
      return;
    }

    const personWithNewNameAndDescription: PersonDto = {
      id: this.person.id,
      name: this.editPersonNameFromGroupPageField.nativeElement.value,
      description: this.editPersonDescriptionFromGroupPageField.nativeElement.value,
      shouldBeTracked: this.person.shouldBeTracked
    }

    this.trackingService
      .updateNameNameAndDescription(personWithNewNameAndDescription)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetPersones(this.group.id))
      )
      .subscribe(() => {
        this.dismissButtonForChangePersonDescripitonModal.nativeElement.click();
        this.resetChangePersonModalFields();
        this.person = null;
      });

  }

  onGroupSelected(group: GroupDto): void {
    if (this.group) {
      if (this.group.id == group.id) {
        this.group = null;
        this.persones = null;
        this.person = null;
        return;
      }
    }
    this.group = group;
    this.loadAndSetPersones(this.group.id).subscribe();
  }

  onGroupModalToOpen(group: GroupDto): void {
    this.editGroupNameField.nativeElement.value = group.name;
    this.editGroupDescriptionField.nativeElement.value = group.description;
  }


  onGroupNameToChange(shouldChange: boolean): void {
    if (!shouldChange) {
      return;
    }

    const groupWithNewNameAndDescription: GroupDto = {
      id: this.group.id,
      name: this.editGroupNameField.nativeElement.value,
      description: this.editGroupDescriptionField.nativeElement.value,
      shouldBeTracked: this.group.shouldBeTracked
    };

    this.trackingService
      .updateGroupNameAndDescription(groupWithNewNameAndDescription)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(() => this.loadAndSetGroups())
      )
      .subscribe(() => {
        this.dismissButtonForChangeGroupNameModal.nativeElement.click();
        this.resetChangeGroupModalFields();
        this.group = null;
        this.person = null;
        this.persones = null;
      });
  }



  private loadAndSetGroups(): Observable<void> {
    return this.trackingService
      .getGroups()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((groupsResponse: GroupDto[]) => { 
          this.groups = groupsResponse;
        })
      );
  }

  private loadAndSetPersones(groupId: string): Observable<void> {
    return this.trackingService
      .getPersones(groupId)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((personesResponse: PersonDto[]) => { 
          this.persones = personesResponse;
        })
      );
  }


  
  private resetChangeGroupModalFields() {
    this.editGroupNameField.nativeElement.value = '';
    this.editGroupDescriptionField.nativeElement.value = '';
  }

    
  private resetChangePersonModalFields() {
    this.editPersonNameFromGroupPageField.nativeElement.value = '';
    this.editPersonDescriptionFromGroupPageField.nativeElement.value = '';
  }

  private resetNewGroupModalFields() {
    this.addGroupNameField.nativeElement.value = '';
    this.addGroupDescriptionField.nativeElement.value = '';
  }

  private resetNewPersonModalFields() {
    this.addPersonNameField.nativeElement.value = '';
    this.addPersonDescriptionField.nativeElement.value = '';
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
		this.unsubscribe$.complete();  
  }
}
