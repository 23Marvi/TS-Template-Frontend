import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetLanguage } from "./actions/set-language.action";
import { SendToastAction } from "./actions/toastMessage";
import { IToastMessage } from "src/app/interfaces/toast-message.interface";

export interface IAppState {
    language: string;
    message: IToastMessage;
}

@State<IAppState>({
    name: "app",
    defaults: {
        language: "en-GB",
        message: null
    }
})
@Injectable()
export class AppState {

    @Selector()
    static language(state: IAppState): string {
    	return state.language;
    }

    @Selector()
    static message(state: IAppState): IToastMessage {
    	return state.message;
    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<IAppState>, payload: SetLanguage): void {
    	ctx.patchState({
    		language: payload.language
    	});
    }

    @Action(SendToastAction)
    sendToastMessage(ctx: StateContext<IAppState>, payload: SendToastAction): void {
    	ctx.patchState({
    		message: payload.message
    	});
    }
}
