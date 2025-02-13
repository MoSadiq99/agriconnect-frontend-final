import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicePricePredictionComponent } from './rice-price-prediction.component';

describe('RicePricePredictionComponent', () => {
  let component: RicePricePredictionComponent;
  let fixture: ComponentFixture<RicePricePredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicePricePredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RicePricePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
