import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const pat = /^https?:\/\//i;
    let url = request.url;
    if (!pat.test(request.url)) {
        url = environment.serverUrl + request.url;
    }
    
    const credentialsKey = 'aartuning';
    let token = '';
    try {
      token = JSON.parse(sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey)).data;
    } catch (e) {
      token = '';
    }
    
    request = request.clone({       
      headers: request.headers.set('Authorization', `Bearer ${token}`),
      url: url
    });

    return next.handle(request);
  }

}
