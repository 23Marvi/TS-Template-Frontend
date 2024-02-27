import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SetLanguage } from "./actions/set-language.action";
import { AppState } from "./app.state";

@Injectable()
export class AppStateFacade {

    @Select(AppState.language) language$: Observable<string>;

    constructor(
        private store: Store
    ) { }

    setLanguage(language: string): Observable<void> {
        return this.store.dispatch(new SetLanguage(language));
    }
}
