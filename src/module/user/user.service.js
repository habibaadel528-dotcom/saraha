import userModel from "../../db/model/user.model.js";
import { findOne } from "../../db/repository/base.repo.js";
import * as exceptions from "../../common/exceptions/index.js";
import {
    myHash,
    myCompare
} from "../../common/utils/security.js";
import { encrypting } from "../../common/utils/encrypting.js";
export const createUser = async (data) => {
    const exists = await findOne({
        model: userModel,
        where: {
            email: data.email
        }
    });
    if (exists) {
        exceptions.ConflictException(
            "This user already exists"
        );
    }
    const user = await userModel.create({
        ...data,
        password: await myHash(data.password),
        phone: data.phone
            ? encrypting(data.phone)
            : undefined,
        DOB: data.DOB
            ? new Date(data.DOB)
            : undefined,
        confirmEmail: new Date()
    });
    return user;
};
export const login = async (data) => {
    const { email, password } = data;
    const user = await findOne({
        model: userModel,
        where: {
            email
        }
    });
    if (
        !user ||
        !user.password ||
        !(await myCompare(password, user.password))
    ) {
        exceptions.NotFoundException(
            "user not found"
        );
    }
    return user;
};
export const getAllUsers = async () => {
    return await userModel.find({});
};