import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import UnsplashSearch from 'unsplash-search';
import { ColorEvent } from 'ngx-color';
import { fabric } from 'fabric';
import { emoticonsList } from './emoticons';
import { environment } from '@env/environment';
import { Object as FObject } from 'fabric/fabric-impl';
import { CreateNewStoryService } from 'app/service/create-new-story.service';
import { AuthenticationService } from 'app/service/authentication.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-new-story',
  templateUrl: './create-new-story.component.html',
  styleUrls: ['./create-new-story.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateNewStoryComponent implements OnInit {
  private userId;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public keypressed;
  public canvas: any;
  public assetsUrl = environment.assetsUrl;
  isBack = false;
  searchBackText: string;
  searchIblockText: string;
  selectedBackIndex: any;
  selectedIblockIndex: any;
  back1 = false;
  back2 = false;
  back3 = false;
  back4 = false;
  Iblock1 = false;
  Iblock2 = false;
  Iblock3 = false;
  backColor = 'white';
  libraryBackImages = [];
  libraryIblockImages = [];
  storySrc: any;
  waterMarkSrc: any;
  storyBack = "";
  accessKey = '5aee8ed958eba566e2f75a9e83e61a8fbd351bc204edf22f73a70a4b6549517a';
  provider = new UnsplashSearch(this.accessKey);
  sticker1 = false;
  sticker2 = false;
  sticker3 = false;
  sticker4 = false;
  sticker5 = false;
  sticker6 = false;
  sticker7 = false;
  sticker8 = false;
  sticker1Style = {};
  sticker2Style = {};
  sticker3Style = {};
  sticker4Style = {};
  sticker5Style = {};
  sticker6Style = {};
  sticker7Style = {};
  sticker8Style = {};
  emoticonList = emoticonsList;
  beachCount = 22;
  doodleCount = 100;
  landmarkCount = 100;
  transCount = 22;
  bubblCount = 104;
  cloudCount = 15;
  starCount = 6;
  font = '';
  ctx: any;
  storyUrl: any;
  canvasFabric: fabric.Canvas;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.keyCode;
    if (this.keypressed == 46) {
      this.deleteActiveImg();
    }
  }

  constructor(
    private CNstoryService: CreateNewStoryService,
    private authService: AuthenticationService,
    private _snakBar: MatSnackBar
  ) { 
      this.userId = this.authService.credentials.id;
  }

  ngOnInit() {
    this.createCanvas();
  }


  deleteActiveImg() {
    if (this.canvas.getActiveObject() && this.canvas) {
      const delObj = this.canvas.getActiveObject();
      this.canvas.remove(delObj);
      this.canvas.requestRenderAll();
    } else return;
  }

  createCanvas() {
    const canvasEl = document.querySelector('#canvas') as HTMLCanvasElement;
    this.canvas = new fabric.Canvas(canvasEl);
  }

  openBackground() {
    this.back1 = true;
    this.back2 = false;
    this.back3 = false;
    this.back4 = false;
  }

  openYourImage() {
    this.back1 = false;
    this.back2 = true;
    this.back3 = false;
    this.back4 = false;
  }

  setColor() {
    this.back4 = true;
    this.back1 = false;
    this.back2 = false;
    this.back3 = false;
  }

  openIblock() {
    this.Iblock1 = true;
    this.Iblock2 = false;
    this.Iblock3 = false;
  }

  openYourIblock() {
    this.Iblock1 = false;
    this.Iblock2 = true;
    this.Iblock3 = false;
  }

  handleChange($event: ColorEvent) {
    this.backColor = $event.color.hex;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = this.backColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.storyBack = '';
  }

  fileChange($event) {
    if ($event.target.files && $event.target.files[0]) {
      const file = $event.target.files[0];
      const reader = new FileReader();
      reader.onload = (imageFile) => {
        const data = imageFile.target["result"] as string;
        fabric.Image.fromURL(data, (img) => {
          this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height
          })
        });
      };
      reader.readAsDataURL(file);
      return false;
    }
  }

  selectBackImg(item) {
    this.selectedBackIndex = item.id;
    fabric.Image.fromURL(item.url, (img) => {
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {crossOrigin: '*'}, {
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height
      })
    });
    this.canvas.renderAll();
  }


  IblockChange($event) {
    if ($event.target.files && $event.target.files[0]) {
      const file = $event.target.files[0];
      const reader = new FileReader();
      var that = this;
      reader.onload = (imageFile) => {
        const data = imageFile.target["result"] as string;
        fabric.Image.fromURL(data, (img) => {
          const oImg = img.set({
            selectable: true,
            evented: true,
            scaleX: this.canvas.width / (img.width * 4),
            scaleY: this.canvas.width / (img.width * 4)
          });
          that.canvas.add(oImg).renderAll();
          that.canvas.sendToBack(oImg);
        })
      }
      reader.readAsDataURL(file);
    }
  }

  searchBackByText($event) {
    this.searchBackText = $event.target.value;
    if (this.searchBackText.length > 2) {
      this.provider
        .searchAll(this.searchBackText, 3)
        .then(data => {
          for (let i = 0; i < 10; i++) {
            this.libraryBackImages.push({ id: i, url: data.images[i].urls.full });
          }
        }).catch(error => error);
    } else {
      this.libraryBackImages = [];
    }
  }

  searchIblockByText($event) {
    this.searchIblockText = $event.target.value;
    if (this.searchIblockText.length > 2) {
      this.provider
        .searchAll(this.searchIblockText, 3)
        .then(data => {
          for (let i = 0; i < 10; i++) {
            this.libraryIblockImages.push({ id: i, url: data.images[i].urls.full });
          }
        }).catch(error => error);
    } else {
      this.libraryIblockImages = [];
    }
  }


  selectIblockImg(item) {
    this.selectedIblockIndex = item.id;
    var that = this;
    fabric.Image.fromURL(item.url, function (img) {
      const oImg = img.set({
        selectable: true,
        evented: true,
        scaleX: 0.01,
        scaleY: 0.01
      }).scale(0.03);
      that.canvas.add(oImg).renderAll();
      that.canvas.sendToBack(oImg);
    });
  }

  selectBeachImg(index) {
    const url = this.getBeachUrl(index);
    return new Promise(resolve => {
      fabric.loadSVGFromURL(url, (objects, options) => {
        const sticker = fabric.util.groupSVGElements(objects, options);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  selectCloudImg(index) {
    const url = this.getCloudUrl(index);

    return new Promise(resolve => {
      fabric.util.loadImage(url, img => {
        const sticker = new fabric.Image(img);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  selectDoodleImg(index) {
    const url = this.getDoodleUrl(index);
    return new Promise(resolve => {
      fabric.loadSVGFromURL(url, (objects, options) => {
        const sticker = fabric.util.groupSVGElements(objects, options);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }


  selectEmotionImg(name) {
    const url = this.getEmotionUrl(name);
    return new Promise(resolve => {
      fabric.loadSVGFromURL(url, (objects, options) => {
        const sticker = fabric.util.groupSVGElements(objects, options);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  addAndPositionSticker(sticker: FObject, objectName, fitToScreen) {
    sticker.name = objectName;
    this.canvas.add(sticker);
    this.canvas.setActiveObject(sticker);
    if (fitToScreen) {
      sticker.scaleToWidth(this.canvas.getWidth() / 4);
    }
    sticker.viewportCenter();
    sticker.setCoords();
    this.canvas.requestRenderAll();
  }

  selectLandImg(index) {
    const url = this.getLandUrl(index);
    return new Promise(resolve => {
      fabric.loadSVGFromURL(url, (objects, options) => {
        const sticker = fabric.util.groupSVGElements(objects, options);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  selectBubbleImg(index) {
    const url = this.getBubbleUrl(index);
    return new Promise(resolve => {
      fabric.util.loadImage(url, img => {
        const sticker = new fabric.Image(img);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  selectStarImg(index) {
    const url = this.getStarUrl(index);
    return new Promise(resolve => {
      fabric.util.loadImage(url, img => {
        const sticker = new fabric.Image(img);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  selectTransImg(index) {
    const url = this.getTransUrl(index);
    return new Promise(resolve => {
      fabric.loadSVGFromURL(url, (objects, options) => {
        const sticker = fabric.util.groupSVGElements(objects, options);
        this.addAndPositionSticker(sticker, 'sticker', true);
        resolve();
      });
    });
  }

  selectBeach() {
    this.sticker1 = true;
    this.sticker2 = false;
    this.sticker3 = false;
    this.sticker4 = false;
    this.sticker5 = false;
    this.sticker6 = false;
    this.sticker7 = false;
    this.sticker8 = false;
    this.sticker1Style = {
      'background': 'black'
    };
    this.sticker2Style = {};
    this.sticker3Style = {};
    this.sticker4Style = {};
    this.sticker5Style = {};
    this.sticker6Style = {};
    this.sticker7Style = {};
    this.sticker8Style = {};
  }

  selectCloud() {
    this.sticker1 = false;
    this.sticker2 = true;
    this.sticker3 = false;
    this.sticker4 = false;
    this.sticker5 = false;
    this.sticker6 = false;
    this.sticker7 = false;
    this.sticker8 = false;
    this.sticker1Style = {};
    this.sticker2Style = {
      'background': 'black'
    };
    this.sticker3Style = {};
    this.sticker4Style = {};
    this.sticker5Style = {};
    this.sticker6Style = {};
    this.sticker7Style = {};
    this.sticker8Style = {};
  }

  selectDoodle() {
    this.sticker1 = false;
    this.sticker2 = false;
    this.sticker3 = true;
    this.sticker4 = false;
    this.sticker5 = false;
    this.sticker6 = false;
    this.sticker7 = false;
    this.sticker8 = false;
    this.sticker1Style = {};
    this.sticker2Style = {};
    this.sticker3Style = {
      'background': 'black'
    };
    this.sticker4Style = {};
    this.sticker5Style = {};
    this.sticker6Style = {};
    this.sticker7Style = {};
    this.sticker8Style = {};
  }

  selectEmotion() {
    this.sticker1 = false;
    this.sticker2 = false;
    this.sticker3 = false;
    this.sticker4 = true;
    this.sticker5 = false;
    this.sticker6 = false;
    this.sticker7 = false;
    this.sticker8 = false;
    this.sticker1Style = {}
    this.sticker2Style = {};
    this.sticker3Style = {};
    this.sticker4Style = {
      'background': 'black'
    };
    this.sticker5Style = {};
    this.sticker6Style = {};
    this.sticker7Style = {};
    this.sticker8Style = {};
  }

  selectLandmark() {
    this.sticker1 = false;
    this.sticker2 = false;
    this.sticker3 = false;
    this.sticker4 = false;
    this.sticker5 = true;
    this.sticker6 = false;
    this.sticker7 = false;
    this.sticker8 = false;
    this.sticker1Style = {}
    this.sticker2Style = {};
    this.sticker3Style = {};
    this.sticker4Style = {};
    this.sticker5Style = {
      'background': 'black'
    };
    this.sticker6Style = {};
    this.sticker7Style = {};
    this.sticker8Style = {};
  }

  selectbubble() {
    this.sticker1 = false;
    this.sticker2 = false;
    this.sticker3 = false;
    this.sticker4 = false;
    this.sticker5 = false;
    this.sticker6 = true;
    this.sticker7 = false;
    this.sticker8 = false;
    this.sticker1Style = {}
    this.sticker2Style = {};
    this.sticker3Style = {};
    this.sticker4Style = {};
    this.sticker5Style = {};
    this.sticker6Style = {
      'background': 'black'
    };
    this.sticker7Style = {};
    this.sticker8Style = {};
  }

  selectStar() {
    this.sticker1 = false;
    this.sticker2 = false;
    this.sticker3 = false;
    this.sticker4 = false;
    this.sticker5 = false;
    this.sticker6 = false;
    this.sticker7 = true;
    this.sticker8 = false;
    this.sticker1Style = {}
    this.sticker2Style = {};
    this.sticker3Style = {};
    this.sticker4Style = {};
    this.sticker5Style = {};
    this.sticker6Style = {};
    this.sticker7Style = {
      'background': 'black'
    };
    this.sticker8Style = {};
  }

  selectTrans() {
    this.sticker1 = false;
    this.sticker2 = false;
    this.sticker3 = false;
    this.sticker4 = false;
    this.sticker5 = false;
    this.sticker6 = false;
    this.sticker7 = false;
    this.sticker8 = true;
    this.sticker1Style = {}
    this.sticker2Style = {};
    this.sticker3Style = {};
    this.sticker4Style = {};
    this.sticker5Style = {};
    this.sticker6Style = {};
    this.sticker7Style = {};
    this.sticker8Style = {
      'background': 'black'
    };
  }

  array(n) {
    return Array(n);
  }

  getBeachUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/svg/beach/' + name + '.svg';
    return url;
  }

  getCloudUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/image/clouds/' + name + '.png';
    return url;
  }

  getDoodleUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/svg/doodles/' + name + '.svg';
    return url;
  }

  getEmotionUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/svg/emoticons/' + name + '.svg';
    return url;
  }

  getLandUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/svg/landmarks/' + name + '.svg';
    return url;
  }

  getBubbleUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/image/bubbles/' + name + '.png';
    return url;
  }

  getStarUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/image/stars/' + name + '.png';
    return url;
  }

  getTransUrl(name: number | string) {
    const url = this.assetsUrl + '/stickers/svg/transportation/' + name + '.svg';
    return url;
  }

  addText() {
    this.canvas.add(new fabric.IText('Double Click to edit', {
      fontFamily: 'impact',
      left: 20,
      top: 80,
    }));
    this.canvas.renderAll();
  }

  onfontChange(event) {
    if (event.value == 'times') {
      this.font = 'Times New Roman'
    } else {
      this.font = event.value
    }
    if (this.canvas.getActiveObject() && this.canvas.getActiveObject().fontFamily) {
      this.canvas.getActiveObject().set("fontFamily", 'Inconsolata');
      this.canvas.renderAll();
    }
  }

  completeStory() {
    this.canvas.renderAll();
    const dataUrl = this.getDataUrl();
    this.uploadImage(JSON.stringify(dataUrl));
  }

  uploadImage(dataUrl) {
    this.CNstoryService.uploadStory(this.userId, dataUrl)
      .subscribe(res => {
        this._snakBar.open("Story Complete", 'End Now', {
          duration: 500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => {
        console.log("Faild")
      })
  }

  getDataUrl() {
    this.prepareCanvas();
    try {
      return this.canvas.toDataURL({
        format: 'jpeg',
        quality: 1.0,
      });
    } catch (e) {
      if (e.message.toLowerCase().indexOf('tainted') === -1) return null;
    }
  }

  prepareCanvas() {
    this.canvas.discardActiveObject();
    this.canvas.viewportTransform[4] = 0;
    this.canvas.viewportTransform[5] = 0;
  }

  newStory() {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
    this.canvas.clear();
  }

}
