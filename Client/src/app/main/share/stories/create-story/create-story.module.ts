import { NgModule, Injector, ApplicationRef, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateStoryComponent } from './create-story.component';
import { MERGED_CONFIG } from './image-editor/default-settings';
import { noBackendErrorHandlerFactory } from '@common/core/errors/no-backend-error-handler';
import { Settings } from '@common/core/config/settings.service';
import { ImageEditorUiModule } from './image-editor-ui/image-editor-ui.module';

@NgModule({
  declarations: [
    CreateStoryComponent,
  ],
  entryComponents: [
    CreateStoryComponent
  ],
  imports: [
    CommonModule,
    ImageEditorUiModule,
  ],
  exports: [
    CreateStoryComponent,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: noBackendErrorHandlerFactory,
      deps: [Settings],
    },
  ],
})
export class CreateStoryModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap(app: ApplicationRef) {
    const selector = this.injector.get(MERGED_CONFIG).selector;
    app.bootstrap(CreateStoryComponent, selector);
  }
}
