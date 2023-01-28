import { AngularSvgIconModule } from "angular-svg-icon";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { RequestInterceptor } from "./interceptors/requests.interceptor";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { AppStateModule } from "./state/app/app.module";
import { UserStateModule } from "./state/user/user.module";
import { STORAGE_KEYS } from "./custom-storage/storage-keys";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";
import { ModalModule } from "ngx-bootstrap/modal";
import { ClickOutsideModule } from "ng-click-outside";
import { LottieModule } from "ngx-lottie";
import { NgxPopperModule } from "ngx-popper";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

export function playerFactory(): any {
    return import(/* webpackChunkName: 'lottie-web' */ "lottie-web");
}

@NgModule({
    declarations: [
        // Pages
        AppComponent
    ],
    imports: [
        AppStateModule,
        UserStateModule,
        ModalModule.forRoot(),
        AngularSvgIconModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        LottieModule.forRoot({
            player: playerFactory
        }),
        HttpClientModule,
        ClickOutsideModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            defaultLanguage: "en-GB",
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot({
            positionClass: "toast-top-right",
            progressAnimation: "decreasing",
            timeOut: 3700,
            easing: "none",
            easeTime: 0,
            preventDuplicates: true
        }),
        NgxsStoragePluginModule.forRoot({
            key: STORAGE_KEYS
        }),
        NgxsModule.forRoot([], {
            developmentMode: !environment.production
        }),
        NgxsRouterPluginModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgxPopperModule.forRoot({
            placement: "bottom-start",
            hideOnScroll: true
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
