export interface IToastMessage {
    message: string;
    type: "SUCCESS" | "WARNING" | "ERROR" | "INFO";
    values?: string[];
}