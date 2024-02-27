import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppStateFacade } from "./state/app/app.facade";
import { GlobalProvider } from "./providers/global.provider";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})

export class AppComponent implements OnInit {

    constructor(
        private appStateFacade: AppStateFacade,
        private translateService: TranslateService,
        private globalProvider: GlobalProvider
    ) { }

    async ngOnInit(): Promise<void> {
        this.globalProvider.determineFontSize(window.innerWidth);

        this.appStateFacade.language$.subscribe((language) => {
            this.translateService.reloadLang(language);
            this.translateService.use(language);
        });
    }
}
