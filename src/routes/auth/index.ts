import express from "express";
import { Request, Response } from "express";
import { logInUser } from "../../helpers/auth";
import { UserService } from "../../models/user/index.services";

const router = express.Router();

/**
 *
 */
router.post("/auth/login", async (req: Request, res: Response) => {
    let result;
    try {
        result = await logInUser(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(result.status).json(result.send);
});

/**
 *
 */
router.post("/auth/register", async (req: Request, res: Response) => {
    let result;
    try {
        result = await UserService.create(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });

    }
    res.status(200).json(result);
});

/**
 *
 */
router.get("/auth/refresh", (req, res, next) => {
    res.status(200).json({ token: "token" });
});

module.exports = router;
