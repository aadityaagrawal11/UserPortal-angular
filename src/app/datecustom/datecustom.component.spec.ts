import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatecustomComponent } from './datecustom.component';

describe('DatecustomComponent', () => {
  let component: DatecustomComponent;
  let fixture: ComponentFixture<DatecustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatecustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatecustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
