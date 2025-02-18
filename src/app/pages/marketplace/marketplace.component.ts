import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuyerRequest, RequestType } from 'src/app/models/buyer-request';
import { Listing } from 'src/app/models/listing';
import { BuyerRequestService } from 'src/app/services/buyer-request.service';
import { ListingService } from 'src/app/services/listing.service';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-marketplace',
  imports: [FormsModule, CommonModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent implements OnInit {

  showListings: boolean = true; // Toggle between listings and requirements
  farmerListings: Listing[] = [];
  buyerRequirements: BuyerRequest[] = [];
  filteredListings: Listing[] = [];
  filteredRequirements: BuyerRequest[] = [];
  selectedCropType: string = 'All';
  selectedQuantity: number = 0;
  selectedLocation: string = '';
  cropTypes: string[] = ['Rice', 'Tea', 'Beans', 'Corn'];
  chatMessages: { sender: string, text: string }[] = [];
  newMessage: string = '';
  searchKeyword: string = ''; // Add search keyword property

  constructor(
    private modalService: NgbModal,
    private buyerRequestService: BuyerRequestService,
    private farmerListingService: ListingService
  ) {}

  ngOnInit(): void {

    // this.loadData();

    // Mock data for farmer listings
    this.farmerListings = [
      {
        id: '1',
        cropType: 'Rice',
        quantity: 100,
        unit: 'kg',
        price: 500,
        harvestDate: new Date('2023-10-15'),
        location: 'Farm A, Village X',
        description: 'High-quality organic rice.',
        status: 'ACTIVE',
        farmerId: 123,
        cultivationId: 1
      },
      {
        id: '2',
        cropType: 'Tea',
        quantity: 50,
        unit: 'kg',
        price: 300,
        harvestDate: new Date('2023-11-01'),
        location: 'Farm B, Village Y',
        description: 'Freshly harvested tea leaves.',
        status: 'PENDING',
        farmerId: 123,
        cultivationId: 1
      },
      {
        id: '3',
        cropType: 'Beans',
        quantity: 200,
        unit: 'kg',
        price: 400,
        harvestDate: new Date('2023-09-20'),
        location: 'Farm C, Village Z',
        description: 'Organic green beans.',
        status: 'EXPIRED',
        farmerId: 123,
        cultivationId: 1
      }
    ];

    // Mock data for buyer requirements
    this.buyerRequirements = [
      {
        id: 1,
        cropType: 'Corn',
        quantity: 500,
        quantityType: 'kg',
        location: 'City A',
        startDate: new Date('2023-10-01'),
        deadline: new Date('2023-10-30'),
        description: 'Looking for high-quality corn for processing.',
        status: 'Active',
        buyer: new User,
        requestType: RequestType.DAILY_AVERAGE,
        createdAt: undefined,
        updatedAt: undefined
      },
      {
        id: 2,
        cropType: 'Rice',
        quantity: 1000,
        quantityType: 'kg',
        location: 'City B',
        startDate: new Date('2023-11-01'),
        deadline: new Date('2023-11-15'),
        description: 'Need organic rice for export.',
        status: 'Pending',
        buyer: new User,
        requestType: RequestType.DAILY_AVERAGE,
        createdAt: undefined,
        updatedAt: undefined
      },
      {
        id: 3,
        cropType: 'Beans',
        quantity: 300,
        quantityType: 'kg',
        location: 'City C',
        startDate: new Date('2023-09-25'),
        deadline: new Date('2023-10-10'),
        description: 'Looking for fresh beans for retail.',
        status: 'Fulfilled',
        buyer: new User,
        requestType: RequestType.DAILY_AVERAGE,
        createdAt: undefined,
        updatedAt: undefined
      }
    ];

    // Apply filters initially
    this.filteredListings = [...this.farmerListings];
    this.filteredRequirements = [...this.buyerRequirements];

  }

  loadData(): void {
    // Load farmer listings
    this.farmerListingService.getListings().then((response) => {
      this.farmerListings = response.data;
      this.filteredListings = [...this.farmerListings];
    });

    // Load buyer requirements
    this.buyerRequestService.getBuyerRequests().subscribe((data) => {
      this.buyerRequirements = data;
      this.filteredRequirements = [...this.buyerRequirements];
    });
  }

  applyFilters(): void {
    if (this.showListings) {
      this.filteredListings = this.farmerListings.filter(listing => {
        return (
          (this.selectedCropType === 'All' || listing.cropType === this.selectedCropType) &&
          (this.selectedQuantity === 0 || listing.quantity >= this.selectedQuantity) &&
          (this.selectedLocation === '' || listing.location.includes(this.selectedLocation)) &&
          (this.searchKeyword === '' ||
            listing.cropType.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            listing.description.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            listing.location.toLowerCase().includes(this.searchKeyword.toLowerCase()))
        );
      });
    } else {
      this.filteredRequirements = this.buyerRequirements.filter(requirement => {
        return (
          (this.selectedCropType === 'All' || requirement.cropType === this.selectedCropType) &&
          (this.selectedQuantity === 0 || requirement.quantity >= this.selectedQuantity) &&
          (this.selectedLocation === '' || requirement.location.includes(this.selectedLocation)) &&
          (this.searchKeyword === '' ||
            requirement.cropType.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            requirement.description.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            requirement.location.toLowerCase().includes(this.searchKeyword.toLowerCase()))
        );
      });
    }
  }

  resetFilters(): void {
    this.selectedCropType = 'All';
    this.selectedQuantity = 0;
    this.selectedLocation = '';
    this.searchKeyword = ''; // Reset search keyword
    this.applyFilters();
  }

  openChatModal(content: unknown, item: Listing | BuyerRequest): void {
    this.chatMessages = []; // Reset chat messages

    // Load chat messages
    if (item instanceof Listing) {
      this.chatMessages.push({ sender: 'Farmer', text: 'Hello! How can I help you?' });
    } else {
      this.chatMessages.push({ sender: 'Buyer', text: 'Hello! I am interested in your requirement.' });
    }

    this.modalService.open(content, { size: 'lg' });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push({ sender: 'Buyer', text: this.newMessage });
      this.newMessage = '';
    }
  }

  addToWishlist(item: Listing | BuyerRequest): void {
    console.log('Added to wishlist:', item);
  }

  placeOrder(listing: Listing): void {
    console.log('Order placed:', listing);
  }

  fulfillRequirement(requirement: BuyerRequest): void {
    console.log('Requirement fulfilled:', requirement);
  }
}
