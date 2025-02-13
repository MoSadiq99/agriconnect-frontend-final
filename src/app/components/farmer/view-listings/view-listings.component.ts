import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Listing } from '../../../models/listing';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-view-listings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-listings.component.html',
  styleUrls: ['./view-listings.component.scss'],
  providers: [DatePipe]
})
export class ViewListingsComponent implements OnInit {
  listings: Listing[] = [];
  filteredListings: Listing[] = [];
  selectedListing: Listing | null = null;
  newListing: Listing = new Listing();
  selectedStatus: string = 'All';
  sortBy: string = 'harvestDate';
  collapsedStates: Map<string, boolean> = new Map(); // Track collapsed state

  constructor(private modalService: NgbModal, private datePipe: DatePipe, private listingService: ListingService) {}

  getSampleListings(): Listing[] {
    return [
      new Listing({
        id: '1',
        cropType: 'Beans',
        quantity: 1000,
        price: 250,
        unit: 'kg',
        harvestDate: new Date('2023-09-01'),
        location: 'Kurunegala, Sri Lanka',
        description: 'High-quality Beans from organic farming.',
        status: 'Active',
        farmerId: '123'
      }),
      new Listing({
        id: '2',
        cropType: 'Rice',
        quantity: 500,
        price: 350,
        unit: 'kg',
        harvestDate: new Date('2023-11-15'),
        location: 'Kurunegala, Sri Lanka',
        description: 'Samba rice grown in fertile soil.',
        status: 'Pending',
        farmerId: '123'
      })
    ];
  }

    ngOnInit(): void {
    this.listings = this.getSampleListings();
    this.filteredListings = [...this.listings];
    this.loadListings();
  }

  loadListings(): void {
    this.listingService.getListings().then((response) => {
      this.listings = response.data;
      this.filterListings(); // Apply current filter
      this.sortListings(); // Apply current sort
    }).catch((error) => {
      console.error('Error loading listings:', error.message || error); // Ensure this matches the test
    });
  }

  filterListings(): void {
    if (this.selectedStatus === 'All') {
      this.filteredListings = [...this.listings];
    } else {
      this.filteredListings = this.listings.filter(listing => listing.status === this.selectedStatus);
    }
  }

  sortListings(): void {
    this.filteredListings.sort((a, b) => {
      if (this.sortBy === 'harvestDate') {
        return new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime();
      } else if (this.sortBy === 'price') {
        return a.price - b.price;
      } else if (this.sortBy === 'quantity') {
        return a.quantity - b.quantity;
      }
      return 0;
    });
  }

  getActiveListings(): Listing[] {
    return this.listings.filter(listing => listing.status === 'Active');
  }

  getPendingListings(): Listing[] {
    return this.listings.filter(listing => listing.status === 'Pending');
  }

  openCreateListingModal(content: unknown): void {
    this.newListing = new Listing();
    this.modalService.open(content, { size: 'lg' });
  }

  createListing(): void {
    this.listings.push(this.newListing);
    this.filteredListings = [...this.listings];
    this.modalService.dismissAll();
  }

  openUpdateModal(content: unknown, listing: Listing): void {
    this.selectedListing = { ...listing };
    this.modalService.open(content, { size: 'lg' });
  }

  updateListing(): void {
    const index = this.listings.findIndex(listing => listing.id === this.selectedListing.id);
    if (index !== -1) {
      this.listings[index] = { ...this.selectedListing };
      this.filteredListings = [...this.listings];
    }
    this.modalService.dismissAll();
  }

  deleteListing(listing: Listing): void {
    this.listings = this.listings.filter(l => l.id !== listing.id);
    this.filteredListings = [...this.listings];
  }

  toggleCollapse(id: string): void {
    const currentState = this.collapsedStates.get(id) || false;
    this.collapsedStates.set(id, !currentState);
  }

  isCollapsed(id: string): boolean {
    return this.collapsedStates.get(id) || false;
  }
}
