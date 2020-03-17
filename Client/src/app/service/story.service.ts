import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private httpClient: HttpClient) { }

  getStories(userId: any): Observable<any> {
    return this.httpClient
      .get('/story_image', {
        params: new HttpParams().set('userId', userId)
      })
      .pipe(
        map((res: any) => res)
      )
  }

  deleteStoryById(storyId: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        storyId: storyId,
        name: 'test',
      },
    };
    return this.httpClient
      .delete('/story_image', options)
      .pipe(
        map((res: any) => res)
      );
  }
}
