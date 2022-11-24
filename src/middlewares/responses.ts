import { Response } from "express";

class Res {

    public success = (
        status: number,
        message: string,
        data: object,
        res: Response
    ) => {
        return res.status(status).json({ status, message, data });
    };


    public ok = (status: number, message: string, res: Response) => {
        return res.status(status).json({
            status,
            message,
        });
    };
  
    public error = (status: number, message: string, res: Response) => {
        return res.status(status).json({
            status,
            message,
        });
    };
}

export default Res;