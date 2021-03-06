import {Injectable} from '@angular/core';
import {Settings} from '../config/settings.service';

@Injectable({
    providedIn: 'root',
})
export class LazyLoaderService {
    private loadedAssets = {};

    constructor(private config: Settings) {}

    /**
     * Load js or css asset and return promise resolved on load event.
     */
    public loadAsset(url: string, params: { id?: string, force?: boolean, type?: 'js'|'css' } = {type: 'js'}): Promise<any> {
        // script is already loaded, return resolved promise
        if (this.loadedAssets[url] === 'loaded' && !params.force) {
            return new Promise((resolve) => resolve());

        // script has never been loaded before, load it, return promise and resolve on script load event
        } else if (!this.loadedAssets[url] || (params.force && this.loadedAssets[url] === 'loaded')) {
            this.loadedAssets[url] = new Promise((resolve, reject) => {
                const finalUrl = url.indexOf('//') > -1 ? url : this.config.getAssetUrl() + url;
                const finalId = params.id || url.split('/').pop();

                if (params.type === 'css') {
                    this.loadStyleAsset(finalUrl, finalId, resolve);
                } else {
                    this.loadScriptAsset(finalUrl, finalId, resolve);
                }
            });

            return this.loadedAssets[url];

            // script is still loading, return existing promise
        } else {
            return this.loadedAssets[url];
        }
    }

    private loadStyleAsset(url, id: string, resolve: (value?: any | PromiseLike<any>) => void) {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.id = id || url.split('/').pop();
        style.href = url.indexOf('//') > -1 ? url : this.config.getAssetUrl() + url;

        style.onload = () => {
            this.loadedAssets[url] = 'loaded';
            resolve();
        };

        document.head.appendChild(style);
    }

    private loadScriptAsset(url, id: string, resolve: (value?: any | PromiseLike<any>) => void) {
        const s: HTMLScriptElement = document.createElement('script');
        s.async = true;
        s.id = id || url.split('/').pop();
        s.src = url.indexOf('//') > -1 ? url : this.config.getAssetUrl() + url;

        s.onload = () => {
            this.loadedAssets[url] = 'loaded';
            resolve();
        };

        document.body.appendChild(s);
    }
}
