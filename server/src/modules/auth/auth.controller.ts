import { Request, Response } from 'express';

import { asyncHandler } from '../../utils/async-handler.util';

import { ApiResponse } from '../../utils/api-response.util';

import {
    loginUser,
    registerUser,
} from './auth.service';

export const registerController =
    asyncHandler(
        async (req: Request, res: Response) => {
            const result = await registerUser(
                req.body
            );

            res.status(201).json(
                new ApiResponse(
                    'User registered successfully',
                    result
                )
            );
        }
    );

export const loginController =
    asyncHandler(
        async (req: Request, res: Response) => {
            const result = await loginUser(
                req.body
            );

            res.status(200).json(
                new ApiResponse(
                    'Login successful',
                    result
                )
            );
        }
    );

export const meController =
    asyncHandler(
        async (req: Request, res: Response) => {
            res.status(200).json(
                new ApiResponse(
                    'Current user fetched',
                    req.user
                )
            );
        }
    );