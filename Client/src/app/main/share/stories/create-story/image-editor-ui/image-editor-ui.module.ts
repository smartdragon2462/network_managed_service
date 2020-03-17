import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Settings } from '@common/core/config/settings.service';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DEFAULT_THEMES, DEFAULT_DARK_COLORS, DEFAULT_LIGHT_COLORS } from './default-themes';
import { CssTheme } from '@common/core/types/models/CssTheme';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from '@common/core/theme.service';
import cssVars from 'css-vars-ponyfill';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageEditorModule } from '../image-editor/image-editor.module';
import { ToolbarControlsModule } from './toolbar-controls/toolbar-controls.module';
import { CustomScrollbarModule } from '@common/core/ui/custom-scrollbar/custom-scrollbar.module';
import { MatSliderModule, MatRadioModule, MatButtonModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UploadsModule } from '@common/uploads/uploads.module';
import { ImageEditorComponent } from './image-editor.component';
import { HistoryPanelComponent } from './panels/history-panel/history-panel.component';
import { ObjectsPanelComponent } from './panels/objects-panel/objects-panel.component';
import { OpenSampleImagePanelComponent } from './panels/open-sample-image-panel/open-sample-image-panel.component';
import { BackgroundImageDirective } from './background-image.directive';
import { ExportPanelComponent } from './panels/export-panel/export-panel.component';
import { EditorControlsService } from './toolbar-controls/editor-controls.service';
import { FloatingPanelsService } from './toolbar-controls/floating-panels.service';
import { OverlayPanel } from '@common/core/ui/overlay-panel/overlay-panel.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import { EditorOverlayContainer } from './panels/editor-overlay-container';
import { CanvasStateService } from '../image-editor/canvas/canvas-state.service';

export function init_icons(config: Settings, icons: MatIconRegistry, sanitizer: DomSanitizer, themes: ThemeService) {
  return () => {
    // init icons
    const url = config.getAssetUrl('icons/merged.svg', true);
    icons.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl(url)
    );
    // init themes
    const customThemes = config.get('pixie.ui.themes') as CssTheme[],
      mergedThemes = { ...DEFAULT_THEMES };
    if (customThemes && customThemes.length) {
      customThemes.forEach(theme => {
        const defaultColors = theme.is_dark ? DEFAULT_DARK_COLORS : DEFAULT_LIGHT_COLORS,
          mergedTheme = { ...theme, colors: { ...theme.colors, ...defaultColors } };
        mergedThemes[mergedTheme.name] = mergedTheme;
      });
    }

    const rootEl = document.documentElement.querySelector('pixie-editor') as HTMLElement;

    themes.setRootEl(rootEl);
    themes.registerThemes(mergedThemes);

    const isNativeSupport = typeof window !== 'undefined' &&
      window['CSS'] &&
      window['CSS'].supports &&
      window['CSS'].supports('(--a: 0)');
    if (!isNativeSupport) {
      cssVars({ variables: themes.selectedTheme$.value.colors });
    }
    return new Promise(resolve => resolve());
  };
}

@NgModule({
  declarations: [
    ImageEditorComponent,
    HistoryPanelComponent,
    ObjectsPanelComponent,
    OpenSampleImagePanelComponent,
    BackgroundImageDirective,
    ExportPanelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageEditorModule,
    ToolbarControlsModule,
    CustomScrollbarModule,

    // material
    MatSliderModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    UploadsModule,
  ],
  entryComponents: [
    OpenSampleImagePanelComponent,
    HistoryPanelComponent,
    ObjectsPanelComponent,
    ExportPanelComponent,
    ImageEditorComponent,
  ],
  exports: [
    ImageEditorComponent,
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: init_icons,
        deps: [Settings, MatIconRegistry, DomSanitizer, ThemeService],
        multi: true,
    },
    EditorControlsService,
    FloatingPanelsService,
    OverlayPanel,
    {provide: OverlayContainer, useClass: EditorOverlayContainer},
],
})
export class ImageEditorUiModule { }
