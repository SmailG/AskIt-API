import express from "express";
import { Request, Response } from "express";
import { logInUser } from "../../helpers/auth";
import { User } from "../../models/user/index.model";

const router = express.Router();

/**
 *
 */
router.post("/auth/login", async (req: Request, res: Response) => {
    // if (!user.userName || !user.password)
    // res.status(400).send({ error: 'Credentials not provided' });

    console.log(req.body.user, "User login procedure");
    let result;
    try {
        result = await logInUser(req.body.user);
    } catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(result.status).json(result.send);
});

/**
 *
 */
router.post("/auth/register", async (req: Request, res: Response) => {
    // const code = req.body.code;
    // let token;
    // try {
    //     token = await getTokenFromCode(code);
    // } catch (error) {
    //     res.status(400).json({ error: 'An error occurred' });

    // }
    // res.status(200).json(token);
});

/**
 *
 */
router.get("/auth/refresh", (req, res, next) => {
    res.status(200).json({ token: "token" });
});

module.exports = router;
