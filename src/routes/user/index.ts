import express from "express";
import { Request, Response } from "express";
import { tokenValidation } from "../../helpers/auth";
import { UserService } from "../../models/user/index.services";

const router = express.Router();

/**
 *
 */
router.post("/user/reset-password", tokenValidation, async (req: Request, res: Response) => {
    console.log(req.body, "body");
    let result;
    try {
        result = await UserService.changePassword(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });

    }
    res.status(result.status).json(result.send);
});

module.exports = router;
