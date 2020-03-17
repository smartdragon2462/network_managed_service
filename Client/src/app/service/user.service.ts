import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }

  createUser(user: User): Observable<any> {
      return this.httpClient
          .post('/user', user)
          .pipe(
              map((res: any) => res)
          );
  }

  getAllUsers(): Observable<User[]> {
      return this.httpClient
          .get('/user')
          .pipe(
              map((res: any) => res)
          );
  }
}
