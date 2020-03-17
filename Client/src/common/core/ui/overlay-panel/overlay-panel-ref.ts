import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {randomString} from '@common/core/utils/random-string';
import {ComponentRef} from '@angular/core';

export class OverlayPanelRef {
    public id: string = randomString(15);
    private value = new Subject<any>();
    public componentRef: ComponentRef<any>;

    constructor(private overlayRef: OverlayRef) {}

    public isOpen(): boolean {
        return this.overlayRef && this.overlayRef.hasAttached();
    }

    public close() {
        this.overlayRef && this.overlayRef.dispose();
    }

    public emitValue(value: any) {
        this.value.next(value);
    }

    public valueChanged(): Observable<any> {
        return this.value.asObservable();
    }

    public getPanelEl() {
        return this.overlayRef.overlayElement;
    }

    public updatePosition() {
        return this.overlayRef.updatePosition();
    }

    public afterClosed() {
        return this.overlayRef.detachments().pipe(take(1));
    }
}
