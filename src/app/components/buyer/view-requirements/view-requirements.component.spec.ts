import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRequirementsComponent } from './view-requirements.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { BuyerRequestService } from 'src/app/services/buyer-request.service';
import { BuyerRequest, RequestType } from '../../../models/buyer-request';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


describe('ViewRequirementsComponent', () => {
  let component: ViewRequirementsComponent;
  let fixture: ComponentFixture<ViewRequirementsComponent>;
  let mockBuyerRequestService: jasmine.SpyObj<BuyerRequestService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    // Create spies for the services
    mockBuyerRequestService = jasmine.createSpyObj('BuyerRequestService', ['getBuyerRequests']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    // Mock getBuyerRequests() to return an observable
    mockBuyerRequestService.getBuyerRequests.and.returnValue(of([])); // <-- Ensure it returns an observable

    // Mock the modal open method to return a fake modal reference with a .result property
    // const mockModalRef = { result: Promise.resolve(true) }; // Simulates modal closing successfully
    const mockModalRef = {
      result: Promise.resolve(true),
      close: jasmine.createSpy('close'),
      dismiss: jasmine.createSpy('dismiss')
    } as unknown as NgbModalRef;
    mockModalService.open.and.returnValue(mockModalRef);

    await TestBed.configureTestingModule({
      imports: [ViewRequirementsComponent], // Import instead of declaring
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: BuyerRequestService, useValue: mockBuyerRequestService },
        { provide: NgbModal, useValue: mockModalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load buyer requests on init', () => {
    const mockRequests: BuyerRequest[] = [
      { id: 1, cropType: 'Rice', quantity: 100, quantityType: 'Kg', location: 'Location1', startDate: new Date(), deadline: new Date(), status: 'Pending', requestType: RequestType.ONE_TIME, description: '', buyer: { id: 1, name: 'Mock Buyer' }, createdAt: new Date(), updatedAt: new Date() }
    ];
    mockBuyerRequestService.getBuyerRequests.and.returnValue(of(mockRequests));

    component.ngOnInit();

    expect(component.buyerRequests).toEqual(mockRequests);
    expect(component.filteredBuyerRequests).toEqual(mockRequests);
  });

  it('should handle error when loading buyer requests', () => {
    mockBuyerRequestService.getBuyerRequests.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(component.buyerRequests).toEqual([]);
    expect(component.filteredBuyerRequests).toEqual([]);
  });

  it('should open create buyer request modal', () => {
    const content = {};
    component.openCreateBuyerRequestModal(content);

    expect(mockModalService.open).toHaveBeenCalledWith(content, { size: 'lg' });
  });

  it('should create a new buyer request', () => {
    component.newBuyerRequest = {
      id: 0,
      cropType: 'Rice',
      quantity: 100,
      quantityType: 'Kg',
      location: 'Location1',
      startDate: new Date(),
      deadline: new Date(),
      status: 'Pending',
      requestType: RequestType.ONE_TIME,
      description: '',
      buyer: { id: 1, name: 'Mock Buyer' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    component.createBuyerRequest();

    expect(component.buyerRequests.length).toBe(1);
    expect(component.buyerRequests[0].cropType).toBe('Rice');
    expect(mockModalService.dismissAll).toHaveBeenCalled();
  });

  it('should open chat modal', () => {
    const content = {};
    const request: BuyerRequest = {
      id: 1,
      cropType: 'Rice',
      quantity: 100,
      quantityType: 'Kg',
      location: 'Location1',
      startDate: new Date(),
      deadline: new Date(),
      status: 'Pending',
      requestType: RequestType.ONE_TIME,
      description: '',
      buyer: { id: 1, name: 'Mock Buyer' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    component.openChatModal(content, request);

    expect(mockModalService.open).toHaveBeenCalledWith(content, { size: 'lg' });
    expect(component.chatMessages.length).toBe(2);
  });

  it('should send a new message', () => {
    component.newMessage = 'Hello';
    component.sendMessage();

    expect(component.chatMessages.length).toBe(1);
    expect(component.chatMessages[0].text).toBe('Hello');
    expect(component.newMessage).toBe('');
  });

  it('should add to wishlist', () => {
    const request: BuyerRequest = {
      id: 1,
      cropType: 'Rice',
      quantity: 100,
      quantityType: 'Kg',
      location: 'Location1',
      startDate: new Date(),
      deadline: new Date(),
      status: 'Pending',
      requestType: RequestType.ONE_TIME,
      description: '',
      buyer: { id: 1, name: 'Mock Buyer' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    spyOn(console, 'log');
    component.addToWishlist(request);

    expect(console.log).toHaveBeenCalledWith('Added to wishlist:', request);
  });

  it('should publish requirement', () => {
    const request: BuyerRequest = {
      id: 1,
      cropType: 'Rice',
      quantity: 100,
      quantityType: 'Kg',
      location: 'Location1',
      startDate: new Date(),
      deadline: new Date(),
      status: 'Pending',
      requestType: RequestType.ONE_TIME,
      description: '',
      buyer: { id: 1, name: 'Mock Buyer' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    spyOn(console, 'log');
    component.publishRequirement(request);

    expect(request.status).toBe('Active');
    expect(console.log).toHaveBeenCalledWith('Requirement published:', request);
  });

  it('should delete requirement', () => {
    const request: BuyerRequest = {
      id: 1,
      cropType: 'Rice',
      quantity: 100,
      quantityType: 'Kg',
      location: 'Location1',
      startDate: new Date(),
      deadline: new Date(),
      status: 'Pending',
      requestType: RequestType.ONE_TIME,
      description: '',
      buyer: { id: 1, name: 'Mock Buyer' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    component.buyerRequests = [request];
    component.filteredBuyerRequests = [request];

    spyOn(console, 'log');
    component.deleteRequirement(request);

    expect(component.buyerRequests.length).toBe(0);
    expect(component.filteredBuyerRequests.length).toBe(0);
    expect(console.log).toHaveBeenCalledWith('Requirement deleted:', request);
  });
});
