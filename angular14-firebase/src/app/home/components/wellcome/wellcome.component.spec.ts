import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellcomeComponent } from './wellcome.component';

describe('WellcomeComponent', () => {
  let component: WellcomeComponent;
  let fixture: ComponentFixture<WellcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
