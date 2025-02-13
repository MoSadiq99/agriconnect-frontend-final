import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RicePricePredictionService {
  private readonly apiUrl = 'http://localhost:8080/api/predict';

  constructor() { }

  predictPrice(
    year: number,
    month: number,
    exchangeRate: number,
    fuelPrice: number
  ): Observable<{ retail_price: number, producer_price: number }> {
    const requestBody = {
      year,
      month,
      exchangeRate,
      fuelPrice
    };

    console.log('Request body:', requestBody);  // Log the request body for debugging

    return new Observable(observer => {
      axios.post(this.apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log('Response:', response.data); // Log the response data
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error details:', error.response); // Log error response
          observer.error(error);
        });
    });
  }
}
