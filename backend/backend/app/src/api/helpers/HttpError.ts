import { ApplicationError } from "./ApplicationError.js";


class HttpError extends ApplicationError {
    public  status: number;

    constructor(status: number, msg: string) {
        super(msg);
        this.status = status;
    }
}

export default HttpError;