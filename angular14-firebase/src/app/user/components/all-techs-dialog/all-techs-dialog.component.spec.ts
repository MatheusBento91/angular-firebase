import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTechsDialogComponent } from './all-techs-dialog.component';

describe('AllTechsDialogComponent', () => {
  let component: AllTechsDialogComponent;
  let fixture: ComponentFixture<AllTechsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTechsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTechsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
