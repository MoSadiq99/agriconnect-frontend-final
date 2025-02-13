import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Add CommonModule
import { Cultivation } from '../../../models/cultivation';
import { CultivationService } from 'src/app/services/cultivation.service';
import { SharedModule } from "../../../theme/shared/shared.module";

@Component({
  standalone: true,
  selector: 'app-add-cultivation-form',
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './add-cultivation-form.component.html',
  styleUrls: ['./add-cultivation-form.component.scss']
})
export class AddCultivationFormComponent {


  cropTypes: string[] = ['Wheat', 'Corn', 'Rice', 'Soybean', 'Barley'];
  filteredCropTypes: string[] = [];
  methods: string[] = ['Organic', 'Conventional', 'Hydroponics'];

  cultivation: Cultivation = {
    id: null,
    cropType: '',
    cultivationDate: null,
    harvestDate: null,
    location: '',
    landSize: '',
    expectedYield: '',
    methodOfCultivation: '',
    description: ''
  };

  constructor(private readonly cultivationService: CultivationService) {}

  // ngOnInit lifecycle method removed as it was empty

  onCropTypeInput(): void {
    const searchTerm = this.cultivation.cropType.toLowerCase();
    this.filteredCropTypes = this.cropTypes.filter(cropType =>
      cropType.toLowerCase().includes(searchTerm)
    );
  }

  selectSuggestion(suggestion: string): void {
    this.cultivation.cropType = suggestion;
    this.filteredCropTypes = [];
  }

  onSubmit(cultivationForm: NgForm): void {
    if (cultivationForm.valid) {

      this.cultivationService.addCultivation(this.cultivation).then((response) => {

        console.log('Cultivation added successfully:', response);
        // console.log('Cultivation added successfully:', response.data);
        alert('Cultivation details added successfully!');
        this.resetForm(cultivationForm);

      }).catch((error) => {

        console.error('Error adding cultivation:', error);
        alert('Failed to add cultivation details: ' + error.message);

      });
      // this.cultivationService.addCultivation(this.cultivation).subscribe({
      //   next: (response) => {
      //     console.log('Cultivation added successfully:', response);
      //     alert('Cultivation details added successfully!');
      //     this.resetForm(cultivationForm);
      //   },
      //   error: (error) => {
      //     console.error('Error adding cultivation:', error);
      //     alert('Failed to add cultivation details: ' + error.message);
      //   }
      // });
    } else {
      alert('Please complete the form correctly.');
    }
  }

  resetForm(cultivationForm: NgForm): void {
    cultivationForm.resetForm();
    this.cultivation = {

      id: null,
      cropType: '',
      cultivationDate: null,
      harvestDate: null,
      location: '',
      landSize: '',
      expectedYield: '',
      methodOfCultivation: '',
      description: ''
    };
    this.filteredCropTypes = [];
  }

  close(): void {
    // Handle the close action (e.g., navigating away or closing a modal)
    console.log('Close action triggered.');
  }
}
