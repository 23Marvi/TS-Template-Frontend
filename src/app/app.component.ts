import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { filter, fromEvent } from "rxjs";
import { BaseComponent } from "./components/base-component/base-component";
import { AppStateFacade } from "./state/app/app.facade";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})

export class AppComponent extends BaseComponent implements OnInit {

    constructor(
        private appStateFacade: AppStateFacade,
        private translateService: TranslateService,
        private toastr: ToastrService
    ) {
        super();
        const width = window.innerWidth;
        const baseFontSize = 14;
        const fullHdWidth = 1920;
        this.determineFontSize(width, fullHdWidth, baseFontSize)

        fromEvent(window, "resize").subscribe(event => {
            const width = (event.target as Window).screen.width;
            this.determineFontSize(width, fullHdWidth, baseFontSize)
        });
    }

    determineFontSize(width: number, fullHdWidth: number, baseFontSize: number): void {
        const fontsize = (width / fullHdWidth * baseFontSize).toFixed(3);
        document.documentElement.style.setProperty("font-size", `${fontsize}px`);
    }

    async ngOnInit(): Promise<void> {
        this.appStateFacade.language$.subscribe((language) => {
            this.translateService.reloadLang(language);
            this.translateService.use(language);
        });

        this.appStateFacade.message$.pipe(takeUntil(this.destroy$), filter(x => !!x)).subscribe(async (message) => {
            const text = await this.translateService.instant(`TOAST.${message.type}.${message.message}`, { ...message.values });
            
            if (message.type === "SUCCESS") {
                this.toastr.success(text);
            } else if (message.type === "WARNING") {
                this.toastr.warning(text);
            } else if (message.type === "ERROR") {
                this.toastr.error(text);
            } else {
                this.toastr.info(text);
            }
        });
    }
}
