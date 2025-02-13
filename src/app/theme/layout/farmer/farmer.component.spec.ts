import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerComponent } from './farmer.component';
import { RouterModule } from '@angular/router';

describe('FarmerComponent', () => {
  let component: FarmerComponent;
  let fixture: ComponentFixture<FarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerComponent, RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
