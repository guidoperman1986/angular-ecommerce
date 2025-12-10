import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
    selector: 'img[appImageFallback]',
    standalone: true
})
export class ImageFallback {
    appImageFallback = input<string>('/no-image.jpg');

    constructor(private el: ElementRef<HTMLImageElement>) { }

    @HostListener('error')
    onError() {
        this.el.nativeElement.src = this.appImageFallback();
        // prevent infinite loop if fallback also fails
        this.el.nativeElement.onerror = null;
    }
}
