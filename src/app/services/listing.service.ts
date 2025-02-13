import axios from 'axios';
import { Listing } from './../models/listing';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor() { }

  private readonly baseUrl = 'http://localhost:8080/api';

    // Cultivation listing Methods
    async getListings() {
      return await axios.get(`${this.baseUrl}/farmer/listings`)
    }


    async addListings(listing: Listing) {
      return await axios.post(`${this.baseUrl}/farmer/listings`, listing);
    }
}
