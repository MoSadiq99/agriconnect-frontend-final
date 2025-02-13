import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCultivationFormComponent } from './add-cultivation-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCultivationFormComponent', () => {
  let component: AddCultivationFormComponent;
  let fixture: ComponentFixture<AddCultivationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCultivationFormComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCultivationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
