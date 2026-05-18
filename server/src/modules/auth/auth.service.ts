import { User } from '../../models/user.model';

import { ApiError } from '../../utils/api-error.util';

import { HTTP_STATUS } from '../../constants/http-status.constants';

import { generateToken } from '../../utils/jwt.util';

import {
    ILoginPayload,
    IRegisterPayload,
} from './auth.types';

export const registerUser = async (
    payload: IRegisterPayload
) => {
    const existingUser = await User.findOne({
        email: payload.email,
    });

    if (existingUser) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            'User already exists'
        );
    }

    const user = await User.create(payload);

    const token = generateToken({
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
    });

    return {
        user,
        token,
    };
};

export const loginUser = async (
    payload: ILoginPayload
) => {
    const user = await User.findOne({
        email: payload.email,
    }).select('+password');

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            'Invalid credentials'
        );
    }

    const isPasswordMatched =
        await user.comparePassword(payload.password);

    if (!isPasswordMatched) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            'Invalid credentials'
        );
    }

    const token = generateToken({
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
    });

    return {
        user,
        token,
    };
};