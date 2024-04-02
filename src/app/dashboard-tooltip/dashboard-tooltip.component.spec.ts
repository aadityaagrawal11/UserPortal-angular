import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTooltipComponent } from './dashboard-tooltip.component';

describe('DashboardTooltipComponent', () => {
  let component: DashboardTooltipComponent;
  let fixture: ComponentFixture<DashboardTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTooltipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
