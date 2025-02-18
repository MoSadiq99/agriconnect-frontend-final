import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CultivationService } from 'src/app/services/cultivation.service';
import { Cultivation } from '../../../models/cultivation';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-view-cultivations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-cultivations.component.html',
  styleUrls: ['./view-cultivations.component.scss'],
  providers: [DatePipe]
})
export class ViewCultivationsComponent implements OnInit {
  cultivations: Cultivation[] = [];
  filteredCultivations: Cultivation[] = [];
  selectedCultivation: Cultivation | null = null;
  newCultivation: Cultivation = new Cultivation();
  selectedCropType: string = 'All';
  sortBy: string = 'cultivationDate';
  collapsedStates: Map<number, boolean> = new Map(); // Track collapsed state
  cropTypes: string[] = ['Wheat', 'Rice', 'Corn']; // Example crop types
  filteredCropTypes: string[] = [];

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly cultivationService: CultivationService,
    private readonly modalService: NgbModal,
    // private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCultivations();
  }

  loadCultivations(): void {
    this.cultivationService.getCultivations().then((response) => {
      this.cultivations = response;
      this.filteredCultivations = [...this.cultivations];
    }).catch((error) => {
      console.error('Error loading cultivations:', error);
    });
  }

  filterCultivations(): void {
    if (this.selectedCropType === 'All') {
      this.filteredCultivations = [...this.cultivations];
    } else {
      this.filteredCultivations = this.cultivations.filter(cultivation => cultivation.cropType === this.selectedCropType);
    }
  }

  // sortCultivations(): void {
  //   this.filteredCultivations.sort((a, b) => {
  //     if (this.sortBy === 'cultivationDate') {
  //       return new Date(a.cultivationDate).getTime() - new Date(b.cultivationDate).getTime();
  //     } else if (this.sortBy === 'harvestDate') {
  //       return new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime();
  //     } else if (this.sortBy === 'expectedYield') {
  //       return Number(a.expectedYield) - Number(b.expectedYield);
  //     }
  //     return 0;
  //   });
  // }

  sortCultivations(): void {
    this.filteredCultivations.sort((a, b) => {
      if (!a || !b || !a.expectedYield || !b.expectedYield) {
        return 0;
      }
      return Number(a.expectedYield) - Number(b.expectedYield);
    });
  }


  // Filter functions for active, finished, and upcoming cultivations
  getActiveCultivations(): Cultivation[] {
    return this.cultivations.filter(cultivation =>
      new Date(cultivation.harvestDate) > new Date()
    );
  }

  getUpcomingCultivations(): Cultivation[] {
    return this.cultivations.filter(cultivation =>
      new Date(cultivation.harvestDate) > new Date()
    );
  }

  getFinishedCultivations(): Cultivation[] {
    return this.cultivations.filter(cultivation =>
      new Date(cultivation.harvestDate) <= new Date()
    );
  }

  isActive(cultivation: Cultivation): boolean {
    const currentDate = new Date();
    return new Date(cultivation.cultivationDate) <= currentDate && new Date(cultivation.harvestDate) > currentDate;
  }

  isFinished(cultivation: Cultivation): boolean {
    const currentDate = new Date();
    return new Date(cultivation.harvestDate) <= currentDate;
  }

  isUpcoming(cultivation: Cultivation): boolean {
    const currentDate = new Date();
    return new Date(cultivation.cultivationDate) > currentDate;
  }

  // Modal Functions
  openCreateCultivationModal(content: unknown): void {
    this.newCultivation = new Cultivation();
    this.filteredCropTypes = this.cropTypes;  // Reset filtered suggestions
    this.modalService.open(content, { size: 'lg' });
  }

  // Handle Crop Type Input (for suggestions)
  onCropTypeInput(): void {
    const search = this.newCultivation.cropType.toLowerCase();
    this.filteredCropTypes = this.cropTypes.filter(crop => crop.toLowerCase().includes(search));
  }

  // Select a Crop Type suggestion
  selectSuggestion(suggestion: string): void {
    this.newCultivation.cropType = suggestion;
    this.filteredCropTypes = []; // Hide suggestions after selection
  }

  // Create a new cultivation
  createCultivation(): void {
    if (this.newCultivation.cultivationDate && this.newCultivation.harvestDate && this.newCultivation.expectedYield && this.newCultivation.landSize) {
      this.newCultivation.farmerId = this.authenticationService.getCurrentUserId();
        console.log("Farmer ID: ", this.newCultivation.farmerId);
      if (this.newCultivation.methodOfCultivation === 'Conventional') {
        this.newCultivation.methodOfCultivation = 'CONVENTIONAL';
      }
      if (this.newCultivation.methodOfCultivation === 'Organic') {
        this.newCultivation.methodOfCultivation = 'ORGANIC';
      }
      this.cultivations.push(this.newCultivation);
      this.filteredCultivations = [...this.cultivations];
      this.cultivationService.addCultivation(this.newCultivation).then((response) => {
        console.log('Cultivation added successfully:', response);
        this.newCultivation = new Cultivation();
        this.filteredCropTypes = this.cropTypes;
      })
      this.modalService.dismissAll();
    } else {
      console.log('Please fill all required fields');
    }
  }

  // Open the Update Cultivation modal
  openUpdateModal(content: unknown, cultivation: Cultivation): void {
    this.selectedCultivation = { ...cultivation };
    this.modalService.open(content, { size: 'lg' });
  }

  // Update a cultivation
  updateCultivation(): void {
    const index = this.cultivations.findIndex(cultivation => cultivation.id === this.selectedCultivation.id);
    if (index !== -1) {
      this.cultivations[index] = { ...this.selectedCultivation };
      this.filteredCultivations = [...this.cultivations];
    }
    this.modalService.dismissAll();
  }

  // Delete a cultivation
  deleteCultivation(cultivation: Cultivation): void {
    this.cultivations = this.cultivations.filter(c => c.id !== cultivation.id);
    this.filteredCultivations = [...this.cultivations];
  }

  // Toggle collapse state
  toggleCollapse(id: number): void {
    const currentState = this.collapsedStates.get(id) || false;
    this.collapsedStates.set(id, !currentState);
  }

  isCollapsed(id: number): boolean {
    return this.collapsedStates.get(id) || false;
  }
}
