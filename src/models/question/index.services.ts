import { getConnection, getRepository } from "typeorm";
import { error } from "util";
import { User } from "../user/index.model";
import { Question } from "./index.model";

export class QuestionService {

    /**
     * Get list of questions
     * @returns {Promise<Question[]>}
     */
    public static async find(): Promise<Question[]> {

        return await Question.find();
    }

    /**
     * Get list of questions
     * @returns {Promise<Question[]>}
     */
    public static async getQuestions(skip: any = 0, take: any = 20, criteria: string = "most-recent"): Promise<Question[]> {
        let toFetch;
        if (criteria === "most-recent") {
            toFetch = await getRepository(Question).createQueryBuilder("question")
            .select(["question.questionId"])
            .leftJoin("question.answers", "answers")
            .orderBy("question.questionId", "DESC")
            .skip(skip)
            .take(take)
            .getMany();
        } else if (criteria === "most-answered") {
            toFetch = await getRepository(Question).createQueryBuilder("question")
            .select(["question.questionId"])
            .leftJoin("question.answers", "answers")
            .orderBy("COUNT(answers.answerId)", "DESC")
            .groupBy("question.questionId")
            .offset(skip)
            .limit(take)
            .getMany();
        }  else if (criteria === "most-upvoted") {
            toFetch = await getRepository(Question).createQueryBuilder("question")
            .select(["question.questionId"])
            .leftJoin("question.upvoters", "upvoters")
            .orderBy("COUNT(upvoters.userId)", "DESC")
            .groupBy("question.questionId")
            .offset(skip)
            .limit(take)
            .getMany();
        }

        if (toFetch.length > 0) {
            try {
                return await getRepository(Question).createQueryBuilder("question")
            .select(["question.questionId", "question.content", "upvoters.userId", "downvoters.userId"])
            .leftJoin("question.upvoters", "upvoters")
            .leftJoin("question.downvoters", "downvoters")
            .leftJoin("question.user", "u")
            .leftJoin("question.answers", "answers")
            .loadRelationCountAndMap("question.answerCount", "question.answers", "answerCount")
            .where("question.questionId IN (:ids)", { ids: toFetch.map((q) => q.questionId) })
            .getMany();
            } catch (e) {
                throw e;
            }
        } else { throw new Error("No entries with selected ids"); }

    }

    /**
     * Get user specific questions
     * @returns {Promise<Question[]>}
     */
    public static async getQuestionsForUser(skip: any = 0, take: any = 20, userId: any): Promise<Question[]> {
        if (!userId) { throw new Error("No user id provided"); }
        try {
            if (!await User.findOne(userId)) {
            throw new Error("User with specified id does not exist");
            }

            return await getRepository(Question).createQueryBuilder("question")
        .select(["question.questionId", "question.content", "down.userId", "up.userId"])
        .leftJoin("question.upvoters", "up")
        .leftJoin("question.downvoters", "down")
        .where("question.user = :userId", { userId })
        .skip(skip)
        .take(take)
        .getMany();

        } catch (e) {
            throw e;
        }
    }

    /**
     * Get one question
     * @returns {Promise<Question>}
     */
    public static async findOne(questionId: any): Promise<Question> {
        try {
            const res = await getRepository(Question).createQueryBuilder("question")
        .select(["question.questionId", "question.content", "down.userId", "up.userId"])
        .leftJoinAndSelect("question.answers", "a")
        .leftJoin("question.upvoters", "up")
        .leftJoin("question.downvoters", "down")
        .where("question.questionId = :questionId", { questionId })
        .getOne();

            if (res) {
                 return res;
                } else {
                throw new Error("No question with that id");
                }

        } catch (e) {
            throw e;
        }
    }

    /**
     * Create question
     * @returns {Promise<Question>}
     */
    public static async create(data: any): Promise<Question> {
        console.log(data, "data");
        try {
            data.user = await User.findOne(data.user);
            return await Question.save(data);
        } catch (e) {
            console.log("error: ", e);
            throw e;
        }
    }

    /**
     * Update question
     * @returns {Promise<Question>}
     */
    public static async update(id: number, data: any): Promise<Question> {

        try {
            const question: Question = await Question.findOne({ questionId: id });
            Object.keys(data).forEach((key) => {
                if (key !== "questionId") {
                    (question as any)[key] = data[key];
                }
            });

            return await Question.save(question);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Upvote/downvote question
     * @returns {Promise<Question>}
     */
    public static async vote(questionId: number, userId: number, vote: string): Promise<Question> {

        try {
            const question: Question = await Question.findOne({ where: { questionId }, relations: ["upvoters", "downvoters"] });
            if (!question) {
                throw new Error("Question with specified id not found");
            }
            const user: User = await User.findOne({ userId });
            if (!user) {
                throw new Error("User with specified id not found");
            }
            console.log(question, "question");
            let shouldRemoveVote: boolean;
            question.downvoters.find((u, index) => {
                if (u.userId === Number(userId)) {
                    question.downvoters.splice(index, 1);
                    if (vote === "downvote") { shouldRemoveVote = true; }
                    return true;
                }
            });

            question.upvoters.find((u, index) => {
                if (u.userId === Number(userId)) {
                    question.upvoters.splice(index, 1);
                    if (vote === "upvote") { shouldRemoveVote = true; }
                    return true;
                }
            });

            if (!shouldRemoveVote) {
                vote === "upvote"
                ? question.upvoters.push(user)
                : question.downvoters.push(user);
            }

            return await Question.save(question);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Remove question
     * @returns {Promise<Question>}
     */
    public static async remove(id: number): Promise<any> {

        try {
            const question = await Question.findOne({ questionId: id });
            return await Question.remove(question);
        } catch (e) {
            throw e;
        }
    }
}
