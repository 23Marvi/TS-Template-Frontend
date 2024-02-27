import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable()
export class GlobalProvider {

    constructor(
        private deviceDetectorService: DeviceDetectorService
    ) { }

    /**
     * Determines the font size based on the width of the screen by dividing it with the fullHdWidth.
     * Once the font size is determined it is set on the root element so it can be used by rem.
     * @param {number} width
     * @Returns void
     */
    determineFontSize(width: number): void {
        const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
        // Base fontsize & width for desktop.
        // Normally baseFontSize would be 16 but we collectively decided a while ago that for the my-page and dashboard its 14.
        // Since this is the app, it is basefontsize 16.
        const baseFontSize = 16;
        let fullWidth = 1920;

        // We need to use a different width
        // There simply just is not a way to have a formula according to desktop width (1920)
        // That also works for Tablets and mobile devices. Unless we introduce a random multiplier like we did before.
        if (this.deviceDetectorService.isMobile()) {
            const defaultMobileLandscapeWidth = 915;
            const defaultMobilePortraitWidth = 412;

            // We dont lower the fontsize here.
            if (orientation === "landscape") {
                fullWidth = defaultMobileLandscapeWidth
            } else {
                fullWidth = defaultMobilePortraitWidth
            }
        } else if (this.deviceDetectorService.isTablet()) {
            const defaultTabletLandscapeWidth = 1280;
            const defaultTabletPortraitWidth = 768;

            // For tablet's we do not change the baseFontSize.
            // Only the orientation width.
            if (orientation === "landscape") {
                fullWidth = defaultTabletLandscapeWidth
            } else {
                fullWidth = defaultTabletPortraitWidth
            }
        }

        const fontsize = (width / fullWidth * baseFontSize);
        document.documentElement.style.setProperty("font-size", `${fontsize.toFixed(3)}px`);
    }

    isExpired(date: Date): boolean {
        return Date.now() > date.getTime();
    }
}
