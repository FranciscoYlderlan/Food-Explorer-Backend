import knex from '../database/knex/index.js';
import { AppError } from '../utils/AppError.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfigs from '../configs/auth.js';

export class SessionsController {
    async create(request, response) {
        const { password, email } = request.body;

        const Users = () => knex('user');

        const user = await Users().where({ email }).first();

        if (!user) {
            throw new AppError('Email e/ou senha incorretos', 401);
        }

        const matched = await compare(password, user.password);

        if (!matched) {
            throw new AppError('Email e/ou senha incorretos', 401);
        }

        const isAdmin = user.profile_id == 1;

        const { secret, expiresIn } = authConfigs.jwt;
        const { sign } = jwt;

        const token = sign({ isAdmin }, secret, {
            subject: String(user.id),
            expiresIn,
        });

        return response.status(200).json({ user, token });
    }
}
