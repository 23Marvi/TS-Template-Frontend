import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetLanguage } from "./actions/set-language.action";

export interface IAppState {
    language: string;
}

@State<IAppState>({
    name: "app",
    defaults: {
        language: "en-GB"
    }
})
@Injectable()
export class AppState {

    @Selector()
    static language(state: IAppState): string {
        return state.language;
    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<IAppState>, payload: SetLanguage): void {
        ctx.patchState({
            language: payload.language
        });
    }
}
