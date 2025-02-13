// market-insights.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RicePricePredictionComponent } from "../rice-price-prediction/rice-price-prediction.component";
import { CommonModule } from '@angular/common';
import { Prediction } from 'src/app/models/Prediction';

@Component({
  selector: 'app-market-insights',
  templateUrl: './market-insights.component.html',
  styleUrls: ['./market-insights.component.scss'],
  imports: [RicePricePredictionComponent, CommonModule]
})
export class MarketInsightsComponent implements OnInit {
  isModalOpen = false;
  showSavedPredictions = false;
  savedPredictions: Prediction[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.renderCharts();
    this.loadSavedPredictions();
  }

  renderCharts(): void {
    // Retail Price Chart
    new Chart('retailPriceChart', {
      type: 'line',
      data: {
        labels: Array.from({length: 12}, (_, i) => new Date(0, i).toLocaleString('en-US', {month: 'short'})),
        datasets: [{
          label: 'Retail Price (LKR)',
          data: [120, 125, 130, 128, 135, 140, 138, 145, 150, 148, 155, 160],
          borderColor: '#4CAF50',
          tension: 0.4
        }]
      }
    });

    // Producer Price Chart
    new Chart('producerPriceChart', {
      type: 'line',
      data: {
        labels: Array.from({length: 12}, (_, i) => new Date(0, i).toLocaleString('en-US', {month: 'short'})),
        datasets: [{
          label: 'Producer Price (LKR)',
          data: [80, 85, 82, 88, 90, 95, 92, 98, 100, 105, 108, 110],
          borderColor: '#2196F3',
          tension: 0.4
        }]
      }
    });
  }

  openPredictionModal(): void {
    this.isModalOpen = true;
  }

  closePredictionModal(): void {
    this.isModalOpen = false;
  }

  toggleSavedPredictions(): void {
    this.showSavedPredictions = !this.showSavedPredictions;
  }

  handleSavePrediction(prediction: Prediction): void {
    this.savedPredictions.push(prediction);
    this.savePredictionsToLocalStorage();
  }

  deletePrediction(prediction: Prediction): void {
    this.savedPredictions = this.savedPredictions.filter(p => p !== prediction);
    this.savePredictionsToLocalStorage();
  }

  private loadSavedPredictions(): void {
    const saved = localStorage.getItem('ricePredictions');
    if (saved) this.savedPredictions = JSON.parse(saved);
  }

  private savePredictionsToLocalStorage(): void {
    localStorage.setItem('ricePredictions', JSON.stringify(this.savedPredictions));
  }
}
