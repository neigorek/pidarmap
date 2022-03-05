import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  @ViewChild('groupToggler', { static: false }) groupToggler: ElementRef;
  @ViewChild('personToggler', { static: false }) personToggler: ElementRef;

  groups: GroupDto[];
  group: GroupDto;
  persones: PersonDto[];
  person: PersonDto;

  tempPersones: PersonDto[];
  tempGroups: GroupDto[];

  showActiveGroupsOnly: boolean = false;
  showActivePersonesOnly: boolean = false;

  @Input() resetPage: EventEmitter<string>;

  constructor(private trackingService: TrackingService) { }

  ngOnInit(): void {
    this.loadAndSetGroups().subscribe();
    this.resetPage.subscribe((pageName: string) => {
      if (pageName != "groups") {
        return;
      }

      this.groupToggler.nativeElement.checked = false;
      this.groups = null;
      this.group = null;
      this.persones = null;
      this.person = null;
      this.tempPersones = null;
      this.tempGroups = null;
      this.showActiveGroupsOnly = false;
      this.showActivePersonesOnly = false;
      this.loadAndSetGroups().subscribe();
    });
  }

  toggleActivePersons(): void {
    this.showActivePersonesOnly = !this.showActivePersonesOnly;
    this.person = null;

    if (this.showActivePersonesOnly) {
      this.tempPersones = [...this.persones];
      this.persones = this.persones.filter(t => t.shouldBeTracked);
    } else {
      this.persones = [...this.tempPersones];
      this.tempPersones = null;
    }
  }

  toggleActiveGroups(): void {
    this.showActiveGroupsOnly = !this.showActiveGroupsOnly;
    this.personToggler.nativeElement.checked = false;
    this.showActivePersonesOnly = false;
    this.group = null;
    this.person = null;
    this.persones = null;
    this.tempPersones = null;

    if (this.showActiveGroupsOnly) {
      this.tempGroups = [...this.groups];
      this.groups = this.groups.filter(t => t.shouldBeTracked);
    } else {
      this.groups = [...this.tempGroups];
      this.tempGroups = null;
    }
  }

  toggleGroupTracking(group: GroupDto): void {
    this.trackingService
      .togglePersonTracking(group.id, group.shouldBeTracked)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (group == this.group) {
          this.person = null;
          this.persones = null;
          this.tempPersones = null;
          this.loadAndSetPersones(this.group.id).subscribe();
        }

        if (this.showActiveGroupsOnly) {
          this.groups = this.tempGroups.filter(t => t.shouldBeTracked);
        }

      });

  }

  togglePersonTracking(person: PersonDto): void {
    this.trackingService
      .togglePersonTracking(person.id, person.shouldBeTracked)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (person == this.person) {
          this.person = null;
          this.persones = null;
          this.tempPersones = null
          this.loadAndSetPersones(this.group.id).subscribe();
        }

        if (this.showActivePersonesOnly) {
          this.persones = this.tempPersones.filter(p => p.shouldBeTracked);
        }
      });
  }
 
  onPersonToAdd(shouldAdd: boolean): void {
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

  onGroupToAdd(shouldAdd: boolean): void {
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
        this.tempPersones = null
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
        this.tempPersones = null
      });
  }



  private loadAndSetGroups(): Observable<void> {
    return this.trackingService
      .getGroups()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((groupsResponse: GroupDto[]) => { 
          this.groups = groupsResponse;
          this.tempGroups = null;

          if (this.showActiveGroupsOnly) {
            this.tempGroups = [...this.groups];
            this.groups = this.groups.filter(t => t.shouldBeTracked);
          }
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
          this.tempPersones = null;

          if (this.showActivePersonesOnly) {
            this.tempPersones = [...this.persones];
            this.persones = this.persones.filter(p => p.shouldBeTracked);
          }
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
