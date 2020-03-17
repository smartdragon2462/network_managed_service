import { Component, OnInit } from '@angular/core';
import { Pixie } from '../create-story/image-editor/pixie';
import { EditorMode } from '../create-story/image-editor/enums/editor-mode.enum';
import { NavPosition } from '../create-story/image-editor/enums/control-positions.enum';

@Component({
  selector: 'app-middle-create-new-story',
  templateUrl: './middle-create-new-story.component.html',
  styleUrls: ['./middle-create-new-story.component.scss']
})
export class MiddleCreateNewStoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var i = setInterval(function() {
        
      if (window['Pixie'] == null) return;

       window['Pixie'] = new Pixie({
           image: 'https://i.imgur.com/I0V5WHJ.jpg',
           crossOrigin: true,
           onLoad: () => {
           },
           objectDefaults: {
               basicShape: {
                   fill: 'transparent',
                   stroke: 'red',
                   strokeWidth: 2,
               },
               text: {
                   fill: 'rgb(242, 38, 19)',
               },
           },
           ui: {
               visible: true,
               mode: EditorMode.INLINE,
               defaultTheme: 'dark',
               showExportPanel: true,
               toolbar: {
               },
               nav: {
                   position: NavPosition.TOP,
               },
               openImageDialog: {
                   show: true,
                   sampleImages: [
                       {
                           url: 'images/samples/sample22.jpg',
                           thumbnail: 'images/samples/sample1_thumbnailq.jpg',
                       },
                   ]
               },
           },
           tools: {
               export: {
                   defaultFormat: 'jpeg',
                   defaultQuality: 1,
                   defaultName: 'image',
               },
               filter: {
                   items: ['dither'],
               },
               draw: {
                   replaceDefaultBrushTypes: false,
                   replaceDefaultBrushSizes: false,
                   brushTypes: ['PencilBrush'],
                   brushSizes: [50],
               },
               zoom: {
                   fitImageToScreen: true,
                   allowUserZoom: true,
               },
               import: {
                   maxFileSize: 52428800,
               },
               crop: {
                   defaultRatio: '3:2',
               }
           },
       });
       clearInterval(i);
   }, 50);
  }

}
