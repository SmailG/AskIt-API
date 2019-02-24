import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { decode, sign, verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../models/user/index.model";
import { UserService } from "../models/user/index.services";

/**
 *
 */
export const logInUser = async (user: User) => {
    if (!user.userName || !user.password) {
    return { status: 400, send: { error: "Username/password not provided" }};
    }

    const foundUser = await User.findOne({ where: { userName: user.userName } });
    if (!foundUser) {
        return {
            status: 400,
            send:  "There is no user with this username"
        };
    } else {
        const valid: any = await bcrypt.compare(user.password, foundUser.password);
        if (!valid) {
            return {
                status: 400,
                send: "Invalid password"
            };
        } else {
            delete foundUser.password;
            return {
                status: 200,
                send: { user: foundUser, token: jwt.sign({ userName: foundUser.userName, id: foundUser.userId}, process.env.SECRET_KEY) }
            };
        }
    }

};

/**
 *
 */
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

/**
 *
 */
async function validateAccess(route: string, userID: number): Promise<boolean> {
    return await UserService.findOneBy(userID, "userID").then(async (response: User) => {
        if (!response) { return false; }
        return true;
    });
}

/**
 *
 */
