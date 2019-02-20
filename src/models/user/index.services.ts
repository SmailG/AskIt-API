import { getConnection } from "typeorm";
import { error } from "util";
import { User } from "./index.model";

export class UserService {

    /**
     * Get list of user
     * @returns {Promise<User[]>}
     */
    public static async find(): Promise<User[]> {

        return await User.find();
    }

    /**
     * Get list of user
     * @returns {Promise<User[]>}
     */
    public static async getUsers(): Promise<User[]> {

        return await User.find({ select: ["Email", "UserID", "Username"] });
    }

    /**
     * Get one user
     * @returns {Promise<User[]>}
     */
    public static async findOneBy(param: any, type: string): Promise<User> {

        let query = {};
        if (type === "email") {
            query = { Email: param };
        } else {
            query = { UserID: param };
        }

        return await User.findOne(query);
    }

    /**
     * Create user
     * @returns {Promise<User>}
     */
    public static async create(data: any): Promise<any> {

        try {
            return await User.save(data);
        } catch (e) {
            return;
        }
    }

    /**
     * Update customer
     * @returns {Promise<User>}
     */
    public static async update(id: number, data: any): Promise<any> {

        try {
            const user: User = await User.findOne({ UserID: id });
            Object.keys(data).forEach((key) => {
                if (key !== "userID") {
                    (user as any)[key] = data[key];
                }
            });

            return await User.save(user);
        } catch (e) {
            return e;
        }
    }

    /**
     * Remove user
     * @returns {Promise<User>}
     */
    public static async remove(id: number): Promise<any> {

        try {
            const user = await User.findOne({ UserID: id });
            return await User.remove(user);
        } catch (e) {
            return e;
        }
    }
}
