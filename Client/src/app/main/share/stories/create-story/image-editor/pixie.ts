import {NgModuleRef, NgZone} from '@angular/core';
import {MERGED_CONFIG, PIXIE_VERSION, PixieConfig} from './default-settings';
import {ImageEditorService} from './image-editor.service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {CanvasService} from './canvas/canvas.service';
import {Settings} from '@common/core/config/settings.service';
import { CreateStoryModule } from '../create-story.module';

export class Pixie {
    public version = PIXIE_VERSION;
    private appModule: NgModuleRef<CreateStoryModule>;
    public proxySupported = typeof Proxy === 'function';
    constructor(config: PixieConfig) {
        this.initPixie(config);
        if (this.proxySupported) {
            return new Proxy(this, {
                get(target, propKey) {
                    const injector = target.appModule.injector;
                    const context = !target.hasOwnProperty(propKey) && propKey !== 'destroyEditor' && injector ?
                        injector.get(ImageEditorService) :
                        target;
                    const propValue = context[propKey];
                    if (typeof propValue !== 'function') {
                        return propValue;
                    } else {
                        return function() {
                            return injector.get(NgZone).run(propValue, context, arguments as any);
                        };
                    }
                }
            });
        }
    }

    private initPixie(config: PixieConfig) {
        const merged = ImageEditorService.mergeConfig(config);
        platformBrowserDynamic([{provide: MERGED_CONFIG, useValue: merged}])
            .bootstrapModule(CreateStoryModule)
            .then(this.onAngularReady.bind(this))
            .catch(err => console.log(err));
    }

    private onAngularReady(appModule: NgModuleRef<CreateStoryModule>) {
        appModule.injector.get(CanvasService).state.loaded.subscribe(() => {
            const settings = appModule.injector.get(Settings);
            const onLoad = settings.get('pixie.onLoad') as Function;
            if (onLoad) onLoad();
        });
        if (!this.proxySupported) {
            window['pixie'] = appModule.injector.get(ImageEditorService);
        } else {
            this.appModule = appModule;
        }
    }

    public destroyEditor() {
        this.appModule.destroy();
        this.appModule = null;
    }
}
