import express from "express";
import { Request, Response } from "express";
import { tokenValidation } from "../../helpers/auth";
import { AnswerService } from "../../models/answer/index.services";
const router = express.Router();

/**
 *
 */
router.get("/answer/getAnswers", async (req: Request, res: Response) => {
    let result;
    try {
        // Specify question id
        result = await AnswerService.getAnswers(req.query.id);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.get("/answer/getAnswer", async (req: Request, res: Response) => {
    let result;
    try {
        result = await AnswerService.findOne(req.params.id);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.post("/answer", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await AnswerService.create(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.post("/answer", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await AnswerService.update(req.body.id, req.body.data);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.put("/answer/vote", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await AnswerService.vote(req.body.answerId, req.body.userId, req.body.vote);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.delete("/answer", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await AnswerService.remove(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

module.exports = router;
