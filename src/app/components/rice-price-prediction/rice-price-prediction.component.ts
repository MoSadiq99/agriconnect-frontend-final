// rice-price-prediction.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RicePricePredictionService } from '../../services/rice-price-prediction.service';
import { CommonModule } from '@angular/common';
import { Prediction } from 'src/app/models/Prediction';


@Component({
  selector: 'app-rice-price-prediction',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './rice-price-prediction.component.html',
  styleUrls: ['./rice-price-prediction.component.scss']
})
export class RicePricePredictionComponent {
  @Input() savedPredictions: Prediction[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePredictionEvent = new EventEmitter<Prediction>();
  currentYear = new Date().getFullYear();
  year = this.currentYear;
  month: number | null = null;
  exchangeRate: number | null = null;
  fuelPrice: number | null = null;
  predictionResults: Prediction = null;

  months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];

  constructor(private predictionService: RicePricePredictionService) {}

  predictPrice(): void {
    if (this.isValidForm()) {
      this.predictionService.predictPrice(
        this.year,
        this.month,
        this.exchangeRate,
        this.fuelPrice
      ).subscribe(response => {
        this.predictionResults = {
          retailPrice: response.retail_price,
          producerPrice: response.producer_price,
          month: this.month,
          year: this.year
        };
      });
    }
  }

  savePrediction(): void {
    if (this.predictionResults) {
      this.savePredictionEvent.emit(this.predictionResults);
      this.predictionResults = null;
      this.resetForm();
    }
  }

  close(): void {
    this.closeModal.emit();
    this.resetForm();
  }

  private isValidForm(): boolean {
    return !!this.year && !!this.month && !!this.exchangeRate && !!this.fuelPrice;
  }

  private resetForm(): void {
    this.year = this.currentYear;
    this.month = null;
    this.exchangeRate = null;
    this.fuelPrice = null;
  }
}
