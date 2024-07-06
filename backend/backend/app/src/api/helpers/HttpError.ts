

class HttpError {
    public  status: number;
    public  msg: string;

    constructor(status: number, msg: string) {
        this.status = status;
        this.msg = msg;
    }
}

export default HttpError;