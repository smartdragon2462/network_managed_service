import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIXIE_VERSION, MERGED_CONFIG } from './default-settings';
import { environment } from '@env/environment';
import {TranslationsModule} from 'common/core/translations/translations.module';
import {NgxsModule} from '@ngxs/store';
import {EditorState} from './state/editor-state';
import {FilterState} from '../image-editor-ui/state/filter/filter.state';
import {ResizeState} from '../image-editor-ui/state/resize/resize.state';
import {CropState} from '../image-editor-ui/state/crop/crop.state';
import {TransformState} from '../image-editor-ui/state/transform/transform.state';
import {DrawState} from '../image-editor-ui/state/draw/draw.state';
import {ShapesState} from '../image-editor-ui/state/shapes/shapes.state';
import {StickersState} from '../image-editor-ui/state/stickers/stickers.state';
import {ObjectsState} from '../image-editor-ui/state/objects/objects.state';
import {TextState} from '../image-editor-ui/state/text/text.state';
import {FrameState} from '../image-editor-ui/state/frame/frame.state';
import {CornersState} from '../image-editor-ui/state/corners/corners.state';
import {BackgroundState} from '../image-editor-ui/state/background/background.state';
import {HistoryState} from '../image-editor-ui/state/history/history.state';
import { Settings } from '@common/core/config/settings.service';
import { Keybinds } from '@common/core/keybinds/keybinds.service';
import { HttpErrorHandler } from '@common/core/http/errors/http-error-handler.service';
import { ClientHttpErrorHandler } from '@common/core/http/errors/client-http-error-handler.service';
import { CanvasService } from './canvas/canvas.service';
import { CanvasPanService } from './canvas/canvas-pan.service';
import { CanvasStateService } from './canvas/canvas-state.service';
import { CanvasZoomService } from './canvas/canvas-zoom.service';
import { CanvasKeybindsService } from './canvas/canvas-keybinds.service';
import { ObjectListService } from './objects/object-list.service';
import { ActiveObjectService } from './canvas/active-object/active-object.service';
import { FilterToolService } from './tools/filter/filter-tool.service';
import { ResizeToolService } from './tools/resize/resize-tool.service';
import { HistoryToolService } from './history/history-tool.service';
import { TransformToolService } from './tools/transform/transform-tool.service';
import { CropZoneService } from './tools/crop/crop-zone.service';
import { CropToolService } from './tools/crop/crop-tool.service';
import { DrawToolService } from './tools/draw/draw-tool.service';
import { TextToolService } from './tools/text/text-tool.service';
import { ShapesToolService } from './tools/shapes/shapes-tool.service';
import { ExportToolService } from './tools/export/export-tool.service';
import { ImportToolService } from './tools/import/import-tool.service';
import { FillToolService } from './tools/fill/fill-tool.service';
import { MergeToolService } from './tools/merge/merge-tool.service';
import { RoundToolService } from './tools/round/round-tool.service';
import { WatermarkToolService } from './tools/watermark-tool.service';
import { FrameToolService } from './tools/frame/frame-tool.service';
import { FramePatternsService } from './tools/frame/frame-patterns.service';
import { ActiveFrameService } from './tools/frame/active-frame.service';
import { FrameBuilderService } from './tools/frame/frame-builder.service';
import { ToolsService } from './tools/tools.service';


export function init_app(settings, mergedConfig) {
  return () => {
    const baseConfig = {
      base_url: mergedConfig.baseUrl,
      version: PIXIE_VERSION,
      logging: {
        sentry_public: mergedConfig.sentry_public,
      },
      vebto: {
        environment: environment.production ? 'production' : 'dev',
      },
      themes: {
        default_mode: mergedConfig.ui.defaultTheme
      }
    };

    settings.setMultiple({ ...baseConfig, pixie: mergedConfig });

    return new Promise(resolve => resolve());
  };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslationsModule,
    NgxsModule.forRoot([
      EditorState,
      FilterState,
      ResizeState,
      CropState,
      TransformState,
      DrawState,
      ShapesState,
      StickersState,
      ObjectsState,
      TextState,
      FrameState,
      CornersState,
      BackgroundState,
      HistoryState,
    ], { developmentMode: false }),
  ],
  exports: [
    TranslationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [Settings, MERGED_CONFIG],
      multi: true,
    },
    Settings,
    Keybinds,
    {
      provide: HttpErrorHandler,
      useClass: ClientHttpErrorHandler,
    },
    CanvasService,
    CanvasPanService,
    CanvasZoomService,
    CanvasStateService,
    CanvasKeybindsService,
    ObjectListService,
    ActiveObjectService,
    FilterToolService,
    ResizeToolService,
    HistoryToolService,
    TransformToolService,
    CropZoneService,
    CropToolService,
    DrawToolService,
    TextToolService,
    ShapesToolService,
    ExportToolService,
    ImportToolService,
    FillToolService,
    MergeToolService,
    RoundToolService,
    WatermarkToolService,
    FrameToolService,
    FramePatternsService,
    ActiveFrameService,
    FrameBuilderService,
    ToolsService,
  ],
})
export class ImageEditorModule { }
