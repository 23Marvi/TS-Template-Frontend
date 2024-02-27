import { ResetStateAction } from "./actions/reset-state.action";
import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { SetAccessTokenAction } from "./actions/set-access-token.action";
import { jwtDecode } from "jwt-decode";
import { IJwtDecoded } from "src/app/interfaces/jwt-decoded.interface";

export interface IUserState {
    accessToken: string;
    jwtDecoded: IJwtDecoded;
}

@State<IUserState>({
    name: "user",
    defaults: {
        accessToken: null,
        jwtDecoded: null
    }
})
@Injectable()
export class UserState {
    @Selector()
    static accessToken(state: IUserState): string {
        return state.accessToken;
    }

    @Selector()
    static jwtDecoded(state: IUserState): IJwtDecoded {
        return state.jwtDecoded;
    }

    @Action(SetAccessTokenAction)
    setAccessToken(ctx: StateContext<IUserState>, payload: SetAccessTokenAction): IUserState {
        const accessToken = payload.accessToken;
        const jwtDecoded: IJwtDecoded = jwtDecode(accessToken);
        return ctx.patchState({
            accessToken,
            jwtDecoded
        });
    }

    @Action(ResetStateAction)
    resetStateAction(ctx: StateContext<IUserState>): IUserState {
        return ctx.patchState({
            accessToken: null,
            jwtDecoded: null
        });
    }
}
