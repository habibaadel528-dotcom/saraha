import { Router } from "express";
import { response } from "../../common/utils/index.js";
import {
    createUser,
    login,
    rotateToken,
    loginWithGmail
} from "./auth.service.js";
const authRouter = Router();

authRouter.post(
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

authRouter.post(
    "/loginWithGmail",
    async (req, res, next) => {
        try {
            const issuer = `${req.protocol}://${req.host}`;

            const tokens = await loginWithGmail(
                req.body,
                issuer
            );

            return response({
                res,
                data: tokens,
                status: 200,
                message: "user login"
            });
        } catch (error) {
            next(error);
        }
    }
);

authRouter.post(
    "/login",
    async (req, res, next) => {
        try {
            const issuer = `${req.protocol}://${req.host}`;

            const tokens = await login(
                req.body,
                issuer
            );

            return response({
                res,
                data: tokens,
                status: 200,
                message: "user login"
            });
        } catch (error) {
            next(error);
        }
    }
);

authRouter.post(
    "/refresh-token",
    async (req, res, next) => {
        try {
            const issuer = `${req.protocol}://${req.host}`;

            const tokens = await rotateToken(
                req.body.refreshToken,
                issuer
            );

            return response({
                res,
                data: tokens,
                status: 200,
                message: "token refreshed successfully"
            });
        } catch (error) {
            next(error);
        }
    }
);

export default authRouter;