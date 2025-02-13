// Unit Tests
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingService } from 'src/app/services/listing.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewListingsComponent } from './view-listings.component';
import { Listing } from 'src/app/models/listing';
import { AxiosHeaders } from 'axios';

describe('ViewListingsComponent', () => {
  let component: ViewListingsComponent;
  let fixture: ComponentFixture<ViewListingsComponent>;
  let listingService: jasmine.SpyObj<ListingService>;

  beforeEach(async () => {
    listingService = jasmine.createSpyObj('ListingService', ['getListings']);
    await TestBed.configureTestingModule({
      imports: [ViewListingsComponent],
      providers: [
        { provide: ListingService, useValue: listingService },
        NgbModal,
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewListingsComponent);
    component = fixture.componentInstance;

  });

  it('should load listings successfully', async () => {
    const mockListings: Listing[] = [
      new Listing({ id: '1', cropType: 'Beans', quantity: 1000, price: 250, unit: 'kg', harvestDate: new Date('2023-09-01'), location: 'Kurunegala, Sri Lanka', description: 'Organic beans.', status: 'Active', farmerId: '123' }),
      new Listing({ id: '2', cropType: 'Rice', quantity: 500, price: 350, unit: 'kg', harvestDate: new Date('2023-11-15'), location: 'Kurunegala, Sri Lanka', description: 'Samba rice.', status: 'Pending', farmerId: '123' })
    ];
    listingService.getListings.and.returnValue(Promise.resolve({
      data: mockListings,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() }
    }));

    component.loadListings();
    await fixture.whenStable();

    expect(component.listings).toEqual(mockListings);
  });

  it('should filter listings by status', () => {
    component.listings = [
      new Listing({ id: '1', cropType: 'Beans', quantity: 1000, price: 250, unit: 'kg', harvestDate: new Date('2023-09-01'), location: 'Kurunegala, Sri Lanka', description: 'Organic beans.', status: 'Active', farmerId: '123' }),
      new Listing({ id: '2', cropType: 'Rice', quantity: 500, price: 350, unit: 'kg', harvestDate: new Date('2023-11-15'), location: 'Kurunegala, Sri Lanka', description: 'Samba rice.', status: 'Pending', farmerId: '123' })
    ];

    component.selectedStatus = 'Active';
    component.filterListings();

    expect(component.filteredListings.length).toBe(1);
    expect(component.filteredListings[0].status).toBe('Active');
  });

  it('should sort listings by harvest date', () => {
    component.listings = [
      new Listing({ id: '1', cropType: 'Beans', quantity: 1000, price: 250, unit: 'kg', harvestDate: new Date('2023-09-01'), location: 'Kurunegala, Sri Lanka', description: 'Organic beans.', status: 'Active', farmerId: '123' }),
      new Listing({ id: '2', cropType: 'Rice', quantity: 500, price: 350, unit: 'kg', harvestDate: new Date('2023-11-15'), location: 'Kurunegala, Sri Lanka', description: 'Samba rice.', status: 'Pending', farmerId: '123' })
    ];

    // Update filteredListings with the contents of listings
    component.filteredListings = [...component.listings];

    component.sortBy = 'harvestDate';
    component.sortListings();

    expect(component.filteredListings[0].harvestDate).toEqual(new Date('2023-09-01'));
    expect(component.filteredListings[1].harvestDate).toEqual(new Date('2023-11-15'));
  });

  it('should create a new listing', () => {
    const newListing = new Listing({ id: '3', cropType: 'Corn', quantity: 200, price: 150, unit: 'kg', harvestDate: new Date('2023-10-10'), location: 'Colombo, Sri Lanka', description: 'Fresh corn.', status: 'Active', farmerId: '124' });
    component.newListing = newListing;

    component.createListing();

    expect(component.listings.length).toBe(1);
    expect(component.listings[0]).toEqual(newListing);
  });

  it('should update an existing listing', () => {
    const existingListing = new Listing({ id: '1', cropType: 'Beans', quantity: 1000, price: 250, unit: 'kg', harvestDate: new Date('2023-09-01'), location: 'Kurunegala, Sri Lanka', description: 'Organic beans.', status: 'Active', farmerId: '123' });
    component.listings = [existingListing];
    const updatedListing = { ...existingListing, price: 300 };
    component.selectedListing = updatedListing;

    component.updateListing();

    expect(component.listings[0].price).toBe(300);
  });

  it('should delete a listing', () => {
    const listingToDelete = new Listing({ id: '1', cropType: 'Beans', quantity: 1000, price: 250, unit: 'kg', harvestDate: new Date('2023-09-01'), location: 'Kurunegala, Sri Lanka', description: 'Organic beans.', status: 'Active', farmerId: '123' });
    component.listings = [listingToDelete];

    component.deleteListing(listingToDelete);

    expect(component.listings.length).toBe(0);
  });

  it('should toggle collapse state', () => {
    const listingId = '1';
    component.toggleCollapse(listingId);

    expect(component.isCollapsed(listingId)).toBe(true);

    component.toggleCollapse(listingId);

    expect(component.isCollapsed(listingId)).toBe(false);
  });
});
