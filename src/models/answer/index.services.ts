import { getConnection } from "typeorm";
import { error } from "util";
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
    public static async getAnswers(): Promise<Answer[]> {

        return await Answer.find({ select: ["question", "title", "content"] });
    }

    /**
     * Get one answer
     * @returns {Promise<Answer>}
     */
    public static async findOneBy(param: any, type: string): Promise<Answer> {

        let query = {};
        if (type === "email") {
            query = { Email: param };
        } else {
            query = { answerId: param };
        }

        return await Answer.findOne(query);
    }

    /**
     * Create answer
     * @returns {Promise<Answer>}
     */
    public static async create(data: any): Promise<any> {

        try {
            return await Answer.save(data);
        } catch (e) {
            return;
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
                if (key !== "aommentId") {
                    (answer as any)[key] = data[key];
                }
            });

            return await Answer.save(answer);
        } catch (e) {
            return e;
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
