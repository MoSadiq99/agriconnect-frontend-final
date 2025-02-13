import { Injectable } from '@angular/core';
import { Cultivation } from '../models/cultivation';
import axios from 'axios';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CultivationService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor() {}

  // Fetch all cultivations
  async getCultivations(): Promise<Cultivation[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/farmer/cultivations`);
      return response.data; // Return the list of cultivations
    } catch (error) {
      this.handleError(error);
      return []; // Return an empty array in case of error
    }
  }

  // Add a new cultivation
  async addCultivation(cultivation: Cultivation): Promise<Cultivation> {
    try {
      const response = await axios.post(`${this.baseUrl}/farmer/cultivation`, cultivation);
      return response.data; // Return the newly added cultivation
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  // Update an existing cultivation
  async updateCultivation(cultivation: Cultivation): Promise<Cultivation> {
    try {
      const response = await axios.put(`${this.baseUrl}/farmer/cultivation/${cultivation.id}`, cultivation);
      return response.data; // Return the updated cultivation
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  // Delete a cultivation by ID
  async deleteCultivation(cultivationId: number): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/farmer/cultivation/${cultivationId}`);
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  // Error handling method
  private handleError(error: HttpErrorResponse | unknown) {
    let errorMessage = 'An unknown error occurred!';

    if (error instanceof HttpErrorResponse) {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } else if (error instanceof Error) {
      // Client-side or network error
      errorMessage = `Error: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
