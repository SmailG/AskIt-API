import express from "express";
import { Request, Response } from "express";
import { tokenValidation } from "../../helpers/auth";
import { QuestionService } from "../../models/question/index.services";

const router = express.Router();

/**
 *
 */
router.get("/question/getQuestions", async (req: Request, res: Response) => {
    let result;
    try {
        result = await QuestionService.getQuestions(req.query.offset, req.query.take, req.query.criteria);
    } catch (e) {
        console.log("error: ", e);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.get("/question/getUserQuestions", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await QuestionService.getQuestionsForUser(req.query.offset, req.query.take, req.query.id);
    } catch (e) {
        console.log("error: ", e);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.get("/question/getQuestion", async (req: Request, res: Response) => {
    let result;
    try {
        result = await QuestionService.findOne(req.query.id);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred", message: error });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.post("/question/create", tokenValidation, async (req: Request, res: Response) => {
    let result;
    console.log(req.body, "body");
    try {
        result = await QuestionService.create(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.post("/question/update", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await QuestionService.update(req.body.id, req.body.data);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.put("/question/vote", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await QuestionService.vote(req.body.questionId, req.body.userId, req.body.vote);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

/**
 *
 */
router.post("/question/delete", tokenValidation, async (req: Request, res: Response) => {
    let result;
    try {
        result = await QuestionService.remove(req.body);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }

    res.status(200).json(result);
});

module.exports = router;
