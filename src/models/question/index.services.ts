import { getConnection } from "typeorm";
import { error } from "util";
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
    public static async getQuestions(): Promise<Question[]> {

        return await Question.find({ select: ["user", "title", "content"] });
    }

    /**
     * Get one question
     * @returns {Promise<Question>}
     */
    public static async findOneBy(param: any, type: string): Promise<Question> {

        let query = {};
        if (type === "email") {
            query = { Email: param };
        } else {
            query = { QuestionId: param };
        }

        return await Question.findOne(query);
    }

    /**
     * Create question
     * @returns {Promise<Question>}
     */
    public static async create(data: any): Promise<Question> {

        try {
            return await Question.save(data);
        } catch (e) {
            return;
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
                if (key !== "QuestionId") {
                    (question as any)[key] = data[key];
                }
            });

            return await Question.save(question);
        } catch (e) {
            return e;
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
            return e;
        }
    }
}
