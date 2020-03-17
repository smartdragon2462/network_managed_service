import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Story } from 'app/model/story';
import { StoryService } from 'app/service/story.service';
import { AuthenticationService } from 'app/service/authentication.service';
import { environment } from '@env/environment';
import * as fileSaver from 'file-saver';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StoriesComponent implements OnInit {

  displayedColumns = ['story_image', 'date', 'download', 'upload', 'delete'];
  stories: Array<Story> = [];
  userId: number;
  assetsUrl: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private storyService: StoryService,
    private authService: AuthenticationService,
    private _snakBar: MatSnackBar
  ) {
    this.userId = this.authService.credentials.id;
    this.assetsUrl = environment.assetsUrl;
  }

  ngOnInit() {
    this.storyService.getStories(this.userId)
      .subscribe(res => {
        this.stories = res.stories;
      }, err => {
        console.log(err)
      })
  }

  download(path) {
    let url = this.assetsUrl + '/story/' + path;
    fileSaver.saveAs(url, "story.png")
    this._snakBar.open("File Downloaded", 'End Now', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  deleteStory(story_id) {
    this.storyService.deleteStoryById(story_id)
      .subscribe(res => {
        if (res.success == true) {
          this.refresh(story_id);
          this._snakBar.open("Story Deleted", 'End Now', {
            duration: 500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }, err => {
        console.log(err)
      })
  }

  refresh(story_id) {
    this.stories = this.stories.filter(story => story.story_id !== story_id);
  }

}
