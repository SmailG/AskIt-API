import bcrypt from "bcrypt";
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

        return await User.find({ select: ["email", "userId", "userName"] });
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
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        console.log(data);
        try {
            return await User.save(data);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Change user password
     * @returns {Promise<User>}
     */
    public static async changePassword(data: any): Promise<any> {
        try {
            const user: User = await User.findOne({ where: { email: data.email } });
            if (!user) {
                return {status: 400, send: "There is no user with this email"};
            } else {
                const valid: any = await bcrypt.compare( data.oldPassword, user.password);
                if (!valid) {
                    return { status: 400, send: "Old password is not correct" };
                }

                user.password = await bcrypt.hash(data.newPassword, 10);
                const res = await user.save();
                delete res.password;

                return { status: 200, send: res };
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update user
     * @returns {Promise<User>}
     */
    public static async update(id: number, data: any): Promise<any> {

        try {
            const user: User = await User.findOne({ userId: id });
            Object.keys(data).forEach((key) => {
                if (key !== "userID") {
                    (user as any)[key] = data[key];
                }
            });

            return await User.save(user);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Remove user
     * @returns {Promise<User>}
     */
    public static async remove(id: number): Promise<any> {

        try {
            const user = await User.findOne({ userId: id });
            return await User.remove(user);
        } catch (e) {
            throw e;
        }
    }
}
