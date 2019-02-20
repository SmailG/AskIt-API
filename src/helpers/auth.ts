import { NextFunction, Request, Response } from "express";
import { decode, sign, verify } from "jsonwebtoken";
import { User } from "../models/user/index.model";
import { UserService } from "../models/user/index.services";

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(403).json({error: "No credentials sent!"});
    }

    if ((req.headers.authorization as string).split(" ")[0] === "Bearer") {
        verify((req.headers.authorization as string).split(" ")[1], process.env.SECRET_KEY, async (err: Error, decoded: any) => {
            if (err) {
                return res.status(403).json({error: "Invalid credentials"});
            }

            if (await validateAccess(req.originalUrl, decoded.id)) {
                res.locals.user = decoded;
                next();
            } else {
                res.json({ message: "access forbidden" });
            }
        });
    }
};

async function validateAccess(route: string, userID: number): Promise<boolean> {
    return await UserService.findOneBy(userID, "userID").then(async (response: User) => {
        // console.log('The userID contains the following information');
        // console.log(userID);
        if (!response) { return false; }

        return true;
    });
}
