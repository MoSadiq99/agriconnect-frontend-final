import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCultivationsComponent } from './view-cultivations.component';
import { CultivationService } from 'src/app/services/cultivation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cultivation } from '../../../models/cultivation';

describe('ViewCultivationsComponent', () => {
  let component: ViewCultivationsComponent;
  let fixture: ComponentFixture<ViewCultivationsComponent>;
  let mockCultivationService: jasmine.SpyObj<CultivationService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    mockCultivationService = jasmine.createSpyObj('CultivationService', ['getCultivations']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    await TestBed.configureTestingModule({
      imports: [ViewCultivationsComponent],
      providers: [
        { provide: CultivationService, useValue: mockCultivationService },
        { provide: NgbModal, useValue: mockModalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCultivationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cultivations on init', () => {
    const mockCultivations: Cultivation[] = [
      { id: 1, cropType: 'Rice', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' }
    ];
    mockCultivationService.getCultivations.and.returnValue(Promise.resolve(mockCultivations));
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockCultivationService.getCultivations).toHaveBeenCalled();
  });

  it('should filter cultivations based on selected crop type', () => {
    component.cultivations = [
      { id: 1, cropType: 'Rice', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' },
      { id: 2, cropType: 'Wheat', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' }
    ];
    component.selectedCropType = 'Rice';
    component.filterCultivations();
    expect(component.filteredCultivations.length).toBe(1);
    expect(component.filteredCultivations[0].cropType).toBe('Rice');
  });

  // it('should create a new cultivation', () => {
  //   component.newCultivation = { id: null, cropType: 'Corn', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' };
  //   component.createCultivation();
  //   expect(component.cultivations.length).toBe(1);
  //   expect(mockModalService.dismissAll).toHaveBeenCalled();
  // });

  it('should create a new cultivation 2', () => {
    component.newCultivation = {
      id: 1,
      cropType: 'Rice',
      cultivationDate: new Date(),
      harvestDate: new Date(),
      location: 'Farm A',
      landSize: '10 acres',
      expectedYield: '1000 kg',
      methodOfCultivation: 'Organic',
      description: 'Test cultivation'
    };

    const initialCount = component.cultivations.length;
    component.createCultivation();
    expect(component.cultivations.length).toBe(initialCount + 1);
  });


  it('should update a cultivation', () => {
    component.cultivations = [
      { id: 1, cropType: 'Rice', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' }
    ];
    component.selectedCultivation = { id: 1, cropType: 'Wheat', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' };
    component.updateCultivation();
    expect(component.cultivations[0].cropType).toBe('Wheat');
    expect(mockModalService.dismissAll).toHaveBeenCalled();
  });

  it('should delete a cultivation', () => {
    component.cultivations = [
      { id: 1, cropType: 'Rice', cultivationDate: new Date(), harvestDate: new Date(), location: '', landSize: '', expectedYield: '', methodOfCultivation: '', description: '' }
    ];
    component.deleteCultivation(component.cultivations[0]);
    expect(component.cultivations.length).toBe(0);
  });

});
