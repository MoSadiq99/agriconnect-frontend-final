import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuyerRequest, RequestType } from '../../../models/buyer-request';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuyerRequestService } from 'src/app/services/buyer-request.service';

@Component({
  selector: 'app-view-requirements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-requirements.component.html',
  styleUrls: ['./view-requirements.component.scss'],
  providers: [DatePipe]
})
export class ViewRequirementsComponent implements OnInit {
  requestTypes = [RequestType.DAILY_AVERAGE,
                  RequestType.ONE_TIME,
                  RequestType.WEEKLY_AVERAGE,
                  RequestType.MONTHLY_AVERAGE,
                  RequestType.URGENT];
  buyerRequests: BuyerRequest[] = [];
  filteredBuyerRequests: BuyerRequest[] = [];
  selectedCropType: string = 'All';
  selectedQuantity: number = 0;
  selectedLocation: string = '';
  selectedStatus: string = 'All';
  selectedRequestType: RequestType | 'All' = 'All';
  cropTypes: string[] = ['Rice', 'Tea', 'Beans', 'Corn'];
  chatMessages: { sender: string, text: string }[] = [];
  newMessage: string = '';
  selectedRequest: BuyerRequest = {} as BuyerRequest; // Holds the request to update

  // newBuyerRequest: BuyerRequest = new BuyerRequest();

  // Add this property to the component
  newBuyerRequest: BuyerRequest = {
    id: 0,
    cropType: '',
    quantity: 0,
    quantityType: 'Kg', // Default to Count
    location: '',
    startDate: new Date(),
    deadline: new Date(),
    status: 'Pending', // Default status
    requestType: RequestType.ONE_TIME,
    description: '',
    buyer: { id: 1, name: 'Mock Buyer' },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(
    private modalService: NgbModal,
    private buyerRequestService: BuyerRequestService
  ) { }

  ngOnInit(): void {
    this.loadBuyerRequests();
  }

  loadBuyerRequests(): void {
    this.buyerRequestService.getBuyerRequests().subscribe({
      next: (data) => {
        this.buyerRequests = data;
        this.filteredBuyerRequests = [...this.buyerRequests];
      },
      error: (error) => {
        console.error('Error loading buyer requests:', error);
      }
    });
  }

  // Open the Update Request Modal
  openUpdateBuyerRequestModal(content: unknown, request: BuyerRequest) {
    this.selectedRequest = { ...request };  // Clone the request to avoid modifying the original before saving
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  // Update existing buyer request
  updateBuyerRequest() {
    const index = this.buyerRequests.findIndex(req => req.id === this.selectedRequest.id);
    if (index !== -1) {
      this.buyerRequests[index] = { ...this.selectedRequest };
    }
    this.modalService.dismissAll();
  }

  // Method when a card is clicked to set the filter based on the card clicked
  setFilter(status: string): void {
    this.selectedStatus = status;
    this.filterBuyerRequests(); // Filter buyer requests based on the selected status
  }
  filterBuyerRequests(): void {
    this.filteredBuyerRequests = this.buyerRequests.filter(request => {
      return (this.selectedCropType === 'All' || request.cropType === this.selectedCropType) &&
        (this.selectedQuantity === 0 || request.quantity >= this.selectedQuantity) &&
        (this.selectedLocation === '' || request.location.includes(this.selectedLocation)) &&
        (this.selectedStatus === 'All' || request.status === this.selectedStatus) &&
        (this.selectedRequestType === 'All' || request.requestType === this.selectedRequestType);
    });
  }

  resetFilters(): void {
    this.selectedCropType = 'All';
    this.selectedQuantity = 0;
    this.selectedLocation = '';
    this.selectedStatus = 'All';
    this.selectedRequestType = 'All';
    this.filterBuyerRequests();
  }

  getActiveBuyerRequests(): BuyerRequest[] {
    return this.buyerRequests.filter(request => request.status === 'Active');
  }

  getPendingBuyerRequests(): BuyerRequest[] {
    return this.buyerRequests.filter(request => request.status === 'Pending');
  }

  getFulfilledBuyerRequests(): BuyerRequest[] {
    return this.buyerRequests.filter(request => request.status === 'Fulfilled');
  }

  getExpiredBuyerRequests(): BuyerRequest[] {
    return this.buyerRequests.filter(request => request.status === 'Expired');
  }

  openCreateBuyerRequestModal(content: unknown): void {
    this.newBuyerRequest = new BuyerRequest();
    this.modalService.open(content, { size: 'lg' });
  }

  // createBuyerRequest(): void {
  //   this.buyerRequestService.createBuyerRequest(this.newBuyerRequest).subscribe({
  //     next: (data) => {
  //       this.buyerRequests.push(data);
  //       this.filteredBuyerRequests = [...this.buyerRequests];
  //       this.modalService.dismissAll();
  //     },
  //     error: (error) => {
  //       console.error('Error creating buyer request:', error);
  //     }
  //   });
  // }


  createBuyerRequest(): void {
    const newRequest: BuyerRequest = {
      ...this.newBuyerRequest,
      id: this.buyerRequests.length + 1, // Generate a mock ID
      status: 'Pending', // Explicitly set status to Pending
      createdAt: new Date(), // Mock creation timestamp
      updatedAt: new Date(), // Mock update timestamp
    };

    // Add the new request to the list
    this.buyerRequests.push(newRequest);
    this.filteredBuyerRequests = [...this.buyerRequests]; // Update filtered list

    // Close the modal
    this.modalService.dismissAll();

    // Reset the form
    this.newBuyerRequest = {
      id: 0,
      cropType: '',
      quantity: 0,
      quantityType: 'Count',
      location: '',
      startDate: new Date(),
      deadline: new Date(),
      status: 'Pending', // Reset status to Pending
      requestType: RequestType.ONE_TIME,
      description: '',
      buyer: { id: 1, name: 'Mock Buyer' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Mock buyer request created:', newRequest);
  }

  openChatModal(content: unknown, request: BuyerRequest): void {

    // Initialize chatMessages for the selected request
    this.chatMessages = [
      { sender: 'Farmer', text: `Hello, I can supply ${request.quantity} kg of ${request.cropType}.` },
      { sender: 'Buyer', text: 'Great! What is the price?' }
    ]; // Example chat messages

    // Open the modal
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        console.log('Chat modal closed with result:', result);
      },
      (reason) => {
        console.log('Chat modal dismissed with reason:', reason);
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push({ sender: 'Buyer', text: this.newMessage });
      this.newMessage = '';
    }
  }

  addToWishlist(request: BuyerRequest): void {
    // Add to wishlist logic
    console.log('Added to wishlist:', request);
  }

  publishRequirement(request: BuyerRequest): void {
    request.status = 'Active'; // Change status to Active
    console.log('Requirement published:', request);
  }

  unpublishRequirement(request: BuyerRequest): void {
    request.status = 'Pending'; // Change status to Pending
    console.log('Requirement unpublished:', request);
  }

  updateRequirement(request: BuyerRequest): void {
    // Implement update logic here
    console.log('Requirement updated:', request);
  }

  deleteRequirement(request: BuyerRequest): void {
    // Remove the requirement from the list
    this.buyerRequests = this.buyerRequests.filter(req => req.id !== request.id);
    this.filteredBuyerRequests = this.filteredBuyerRequests.filter(req => req.id !== request.id);
    console.log('Requirement deleted:', request);
  }
}
