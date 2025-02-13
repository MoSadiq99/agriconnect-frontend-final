import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInsightsComponent } from './market-insights.component';

describe('MarketInsightsComponent', () => {
  let component: MarketInsightsComponent;
  let fixture: ComponentFixture<MarketInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketInsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
