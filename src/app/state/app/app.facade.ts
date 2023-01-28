import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SetLanguage } from "./actions/set-language.action";
import { SendToastAction } from "./actions/toastMessage";
import { AppState } from "./app.state";
import { IToastMessage } from "src/app/interfaces/toast-message.interface";

@Injectable()
export class AppStateFacade {

    @Select(AppState.language)
        language$: Observable<string>;

    @Select(AppState.message)
        message$: Observable<IToastMessage>;

    constructor(
        private store: Store
    ) { }

    sendToastAction(message: IToastMessage): Observable<void> {
        return this.store.dispatch(new SendToastAction(message))
    }

    setLanguage(language: string): Observable<void> {
        return this.store.dispatch(new SetLanguage(language));
    }
}
