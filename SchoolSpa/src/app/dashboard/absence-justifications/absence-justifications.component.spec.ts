import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceJustificationsComponent } from './absence-justifications.component';

describe('AbsenceJustificationsComponent', () => {
  let component: AbsenceJustificationsComponent;
  let fixture: ComponentFixture<AbsenceJustificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceJustificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceJustificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
