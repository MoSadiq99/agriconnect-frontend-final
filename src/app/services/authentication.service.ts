import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base-service';
import { ApiConfiguration } from './api-configuration';
import { LoginResponse } from '../models/login-response';
import { UserRegisterDto } from './models';



@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/auth/register';

  register(user: UserRegisterDto): Observable<unknown> {
    return this.http.post(AuthenticationService.RegisterPath, user);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/auth/login';

  login(credentials: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AuthenticationService.LoginPath, credentials);
  }
}

/**
 * Authentication endpoints
 */
// @Injectable({ providedIn: 'root' })
// export class AuthenticationService extends BaseService {
//   constructor(config: ApiConfiguration, http: HttpClient) {
//     super(config, http);
//   }

//   /** Path part for operation `register()` */
//   static readonly RegisterPath = '/api/auth/register';

//   /**
//    * This method provides access to the full `HttpResponse`, allowing access to response headers.
//    * To access only the response body, use `register()` instead.
//    *
//    * This method sends `application/json` and handles request body of type `application/json`.
//    */
//   register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
// }>> {
//     return register(this.http, this.rootUrl, params, context);
//   }

//   /**
//    * This method provides access only to the response body.
//    * To access the full response (for headers, for example), `register$Response()` instead.
//    *
//    * This method sends `application/json` and handles request body of type `application/json`.
//    */
//   register(params: Register$Params, context?: HttpContext): Observable<{
// }> {
//     return this.register$Response(params, context).pipe(
//       map((r: StrictHttpResponse<{
// }>): {
// } => r.body)
//     );
//   }

//   /** Path part for operation `logout()` */
//   static readonly LogoutPath = '/api/auth/logout';

//   /**
//    * This method provides access to the full `HttpResponse`, allowing access to response headers.
//    * To access only the response body, use `logout()` instead.
//    *
//    * This method doesn't expect any request body.
//    */
//   logout$Response(params?: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
//     return logout(this.http, this.rootUrl, params, context);
//   }

//   /**
//    * This method provides access only to the response body.
//    * To access the full response (for headers, for example), `logout$Response()` instead.
//    *
//    * This method doesn't expect any request body.
//    */
//   logout(params?: Logout$Params, context?: HttpContext): Observable<string> {
//     return this.logout$Response(params, context).pipe(
//       map((r: StrictHttpResponse<string>): string => r.body)
//     );
//   }

//   /** Path part for operation `login()` */
//   static readonly LoginPath = '/api/auth/login';

//   /**
//    * This method provides access to the full `HttpResponse`, allowing access to response headers.
//    * To access only the response body, use `login()` instead.
//    *
//    * This method sends `application/json` and handles request body of type `application/json`.
//    */
//   login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
//     return login(this.http, this.rootUrl, params, context);
//   }

//   /**
//    * This method provides access only to the response body.
//    * To access the full response (for headers, for example), `login$Response()` instead.
//    *
//    * This method sends `application/json` and handles request body of type `application/json`.
//    */
//   login(params: Login$Params, context?: HttpContext): Observable<LoginResponse> {
//     return this.login$Response(params, context).pipe(
//       map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
//     );
//   }

// }
