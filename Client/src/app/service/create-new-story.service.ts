import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateNewStoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadStory(userId, dataUrl): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("story", dataUrl);
    formData.append("userId", userId);
    return this.httpClient
      .post('/story_image', formData)
      .pipe(
        map((res: any) => res)
      )
  }
}
