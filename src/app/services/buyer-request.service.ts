import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuyerRequest } from '../models/buyer-request';

@Injectable({
  providedIn: 'root'
})
export class BuyerRequestService {
  private apiUrl = 'http://localhost:8080/api/buyer-requests'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all buyer requests
  getBuyerRequests(): Observable<BuyerRequest[]> {
    return this.http.get<BuyerRequest[]>(this.apiUrl);
  }

  // Create a new buyer request
  createBuyerRequest(request: BuyerRequest): Observable<BuyerRequest> {
    return this.http.post<BuyerRequest>(this.apiUrl, request);
  }

  // Update a buyer request
  updateBuyerRequest(id: number, request: BuyerRequest): Observable<BuyerRequest> {
    return this.http.put<BuyerRequest>(`${this.apiUrl}/${id}`, request);
  }

  // Delete a buyer request
  deleteBuyerRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
