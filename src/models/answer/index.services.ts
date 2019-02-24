import { getConnection, getRepository } from "typeorm";
import { error } from "util";
import { Question } from "../question/index.model";
import { User } from "../user/index.model";
import { Answer } from "./index.model";

export class AnswerService {

    /**
     * Get list of answers
     * @returns {Promise<Answer[]>}
     */
    public static async find(): Promise<Answer[]> {

        return await Answer.find();
    }

    /**
     * Get list of answers
     * @returns {Promise<Answer[]>}
     */
    public static async getAnswers(questionId: any): Promise<Answer[]> {
        if (!questionId || !Question.find(questionId)) { throw new Error("Specified question is not valid"); }
        try {
            // return await Answer.find({ where: { question: questionId } });
            return await getRepository(Answer).createQueryBuilder("answer")
            .select(["answer.answerId", "answer.content", "up.userId", "down.userId"])
            .leftJoin("answer.upvoters", "up")
            .leftJoin("answer.downvoters", "down")
            .where("answer.question = :questionId", { questionId })
            .getMany();

        } catch (e) {
            throw e;
        }
    }

    /**
     * Get one answer
     * @returns {Promise<Answer>}
     */
    public static async findOne(answerId: any): Promise<Answer> {

        return await getRepository(Answer).createQueryBuilder("answer")
        .select(["answer.answerId", "answer.content, up.userId, down.userId"])
        .leftJoinAndSelect("answer.upvoters", "up")
        .leftJoinAndSelect("anwer.downvoters", "down")
        .getOne();
    }

    /**
     * Create answer
     * @returns {Promise<Answer>}
     */
    public static async create(data: any): Promise<any> {
        console.log(data, "data");
        try {
            return await Answer.save(data);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update answer
     * @returns {Promise<Answer>}
     */
    public static async update(id: number, data: any): Promise<any> {

        try {
            const answer: Answer = await Answer.findOne({ answerId: id });
            Object.keys(data).forEach((key) => {
                if (key !== "answerId") {
                    (answer as any)[key] = data[key];
                }
            });

            return await Answer.save(answer);
        } catch (e) {
            return e;
        }
    }

    /**
     * Upvote/downvote answer
     * @returns {Promise<Answer>}
     */
    public static async vote(answerId: number, userId: number, vote: string): Promise<Question> {

        try {
            const answer: Answer = await Answer.findOne({ where: { answerId }, relations: ["upvoters", "downvoters"] });
            if (!answer) {
                throw new Error("Answer with specified id not found");
            }
            const user: User = await User.findOne({ userId });
            if (!user) {
                throw new Error("User with specified id not found");
            }

            let shouldRemoveVote: boolean;
            answer.downvoters.find((u, index) => {
                if (u.userId === Number(userId)) {
                    answer.downvoters.splice(index, 1);
                    if (vote === "downvote") { shouldRemoveVote = true; }
                    return true;
                }
            });

            answer.upvoters.find((u, index) => {
                if (u.userId === Number(userId)) {
                    answer.upvoters.splice(index, 1);
                    if (vote === "upvote") { shouldRemoveVote = true; }
                    return true;
                }
            });

            if (!shouldRemoveVote) {
                vote === "upvote"
                ? answer.upvoters.push(user)
                : answer.downvoters.push(user);
            }

            return await Answer.save(answer);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Remove answer
     * @returns {Promise<Answer[]>}
     */
    public static async remove(id: number): Promise<any> {

        try {
            const answer = await Answer.findOne({ answerId: id });
            return await Answer.remove(answer);
        } catch (e) {
            return e;
        }
    }
}
