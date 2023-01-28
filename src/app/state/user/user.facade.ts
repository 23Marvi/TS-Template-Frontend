import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SetAccessTokenAction } from "./actions/set-access-token.action";
import { UserState } from "./user.state";
import { ResetStateAction } from "./actions/reset-state.action";
import { IJwtDecoded } from "src/app/interfaces/jwt-decoded.interface";

@Injectable({
    providedIn: "root"
})

export class UserStateFacade {

    @Select(UserState.accessToken)
        accessToken$: Observable<string>;

    @Select(UserState.jwtDecoded)
        jwtDecoded$: Observable<IJwtDecoded>;

    constructor(private store: Store) { }

    setAccessToken(accessToken: string): Observable<void> {
        return this.store.dispatch(new SetAccessTokenAction(accessToken));
    }

    resetState(): Observable<void> {
        return this.store.dispatch(new ResetStateAction());
    }
}
