import { getConnection } from "typeorm";
import { error } from "util";
import { Comment } from "./index.model";

export class CommentService {

    /**
     * Get list of comments
     * @returns {Promise<Comment[]>}
     */
    public static async find(): Promise<Comment[]> {

        return await Comment.find();
    }

    /**
     * Get list of comments
     * @returns {Promise<Comment[]>}
     */
    public static async getComments(): Promise<Comment[]> {

        return await Comment.find({ select: ["Question", "Title", "Content"] });
    }

    /**
     * Get one comment
     * @returns {Promise<Comment>}
     */
    public static async findOneBy(param: any, type: string): Promise<Comment> {

        let query = {};
        if (type === "email") {
            query = { Email: param };
        } else {
            query = { CommentId: param };
        }

        return await Comment.findOne(query);
    }

    /**
     * Create comment
     * @returns {Promise<Comment>}
     */
    public static async create(data: any): Promise<any> {

        try {
            return await Comment.save(data);
        } catch (e) {
            return;
        }
    }

    /**
     * Update comment
     * @returns {Promise<Comment>}
     */
    public static async update(id: number, data: any): Promise<any> {

        try {
            const comment: Comment = await Comment.findOne({ CommentId: id });
            Object.keys(data).forEach((key) => {
                if (key !== "CommentId") {
                    (comment as any)[key] = data[key];
                }
            });

            return await Comment.save(comment);
        } catch (e) {
            return e;
        }
    }

    /**
     * Remove comment
     * @returns {Promise<Comment[]>}
     */
    public static async remove(id: number): Promise<any> {

        try {
            const comment = await Comment.findOne({ CommentId: id });
            return await Comment.remove(comment);
        } catch (e) {
            return e;
        }
    }
}
