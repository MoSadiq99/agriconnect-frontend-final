/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addBuyerRequest } from '../fn/marketplace-controller/add-buyer-request';
import { AddBuyerRequest$Params } from '../fn/marketplace-controller/add-buyer-request';
import { addFarmerListing } from '../fn/marketplace-controller/add-farmer-listing';
import { AddFarmerListing$Params } from '../fn/marketplace-controller/add-farmer-listing';
import { BuyerRequest } from '../models/buyer-request';
import { FarmerListing } from '../models/farmer-listing';
import { findMatches } from '../fn/marketplace-controller/find-matches';
import { FindMatches$Params } from '../fn/marketplace-controller/find-matches';

@Injectable({ providedIn: 'root' })
export class MarketplaceControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addFarmerListing()` */
  static readonly AddFarmerListingPath = '/api/marketplace/farmer/listings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addFarmerListing()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFarmerListing$Response(params: AddFarmerListing$Params, context?: HttpContext): Observable<StrictHttpResponse<FarmerListing>> {
    return addFarmerListing(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addFarmerListing$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFarmerListing(params: AddFarmerListing$Params, context?: HttpContext): Observable<FarmerListing> {
    return this.addFarmerListing$Response(params, context).pipe(
      map((r: StrictHttpResponse<FarmerListing>): FarmerListing => r.body)
    );
  }

  /** Path part for operation `addBuyerRequest()` */
  static readonly AddBuyerRequestPath = '/api/marketplace/buyer/requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBuyerRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBuyerRequest$Response(params: AddBuyerRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<BuyerRequest>> {
    return addBuyerRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addBuyerRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBuyerRequest(params: AddBuyerRequest$Params, context?: HttpContext): Observable<BuyerRequest> {
    return this.addBuyerRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<BuyerRequest>): BuyerRequest => r.body)
    );
  }

  /** Path part for operation `findMatches()` */
  static readonly FindMatchesPath = '/api/marketplace/match/{cropType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMatches()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMatches$Response(params: FindMatches$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FarmerListing>>> {
    return findMatches(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMatches$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMatches(params: FindMatches$Params, context?: HttpContext): Observable<Array<FarmerListing>> {
    return this.findMatches$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FarmerListing>>): Array<FarmerListing> => r.body)
    );
  }

}
