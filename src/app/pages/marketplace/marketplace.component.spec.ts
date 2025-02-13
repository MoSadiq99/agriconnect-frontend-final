import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceComponent } from './marketplace.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MarketplaceComponent', () => {
  let component: MarketplaceComponent;
  let fixture: ComponentFixture<MarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceComponent],
            providers: [
              provideHttpClient(withInterceptorsFromDi())

            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
