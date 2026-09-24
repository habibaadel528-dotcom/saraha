import { Router } from "express";
import {
    response
} from "../../common/utils/response.js";
import {
    auth,
    authorization
} from "../../common/middleware/index.js";
import {
    createUser,
    login,
    getAllUsers
} from "./user.service.js";
import {
    decrypting
} from "../../common/utils/encrypting.js";
import { roleEnum } from "../../common/enum/role.enum.js";
const userRouter = Router();
userRouter.post(
    "/signup",
    async (req, res, next) => {
        try {
            const user = await createUser(
                req.body
            );

            return response({
                res,
                data: user,
                status: 201,
                message: "user created"
            });
        } catch (error) {
            next(error);
        }
    }
);

userRouter.post(
    "/login",
    async (req, res, next) => {
        try {
            const user = await login(
                req.body
            );

            return response({
                res,
                data: user,
                status: 200,
                message: "user login"
            });
        } catch (error) {
            next(error);
        }
    }
);

userRouter.get(
    "/",
    auth,
    async (req, res, next) => {
        try {
            const user = req.user;

            if (user.phone) {
                user.phone = decrypting(
                    user.phone
                );
            }

            return response({
                res,
                data: user,
                status: 200,
                message: "user fetched"
            });
        } catch (error) {
            next(error);
        }
    }
);

userRouter.get(
    "/all",
    auth,
    authorization(roleEnum.admin),
    async (req, res, next) => {
        try {
            const users =
                await getAllUsers();

            return response({
                res,
                data: users,
                status: 200,
                message: "users fetched"
            });
        } catch (error) {
            next(error);
        }
    }
);
export default userRouter;