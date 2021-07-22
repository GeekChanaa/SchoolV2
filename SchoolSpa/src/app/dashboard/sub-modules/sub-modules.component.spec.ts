import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModulesComponent } from './sub-modules.component';

describe('SubModulesComponent', () => {
  let component: SubModulesComponent;
  let fixture: ComponentFixture<SubModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
