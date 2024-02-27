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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";
import { GlobalProvider } from "./providers/global.provider";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        // Pages
        AppComponent
    ],
    imports: [
        AppStateModule,
        UserStateModule,
        AngularSvgIconModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        GlobalProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
