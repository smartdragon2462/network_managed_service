import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
  accessRole?: string;
}

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'storyFly';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor(private httpClient: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey)
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  login(context: LoginContext): Observable<Credentials> {
    return this.httpClient
      .post('/auth/login', context)
      .pipe(
        map((res: any) => res),
        catchError(() => of ('Error, could not login.'))
      )
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  get credentials(): Credentials | null {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
    return this._credentials;
  }

  setCredentials(credentials?: Credentials, remember?:boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      return Promise.resolve().then(function () {
        storage.setItem(credentialsKey, JSON.stringify(credentials))
      });
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
