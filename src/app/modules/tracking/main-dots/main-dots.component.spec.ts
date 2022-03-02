import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDotsComponent } from './main-dots.component';

describe('MainDotsComponent', () => {
  let component: MainDotsComponent;
  let fixture: ComponentFixture<MainDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
