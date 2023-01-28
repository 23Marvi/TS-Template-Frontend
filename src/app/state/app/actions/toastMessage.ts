import { IToastMessage } from "src/app/interfaces/toast-message.interface";

export class SendToastAction {
    static readonly type = "[App] SendToastAction";

    constructor(public message: IToastMessage) { }
}
