import jwt from 'jsonwebtoken';
import authConfigs from '../configs/auth.js';
import { AppError } from '../utils/AppError.js';
import { UserRepository } from '../repositories/user/Repository.js';

export function ensureAuthentication(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('JWT Token não informado', 401);

    const [, token] = authHeader.split(' ');

    const { verify } = jwt;
    const userRepository = new UserRepository();

    try {
        const { secret } = authConfigs.jwt;
        const { sub: user_id, isAdmin } = verify(token, secret);

        const user = userRepository.findById(user_id);
        if (user) {
            const userIsAdmin = user.profile_id === 1 && Boolean(isAdmin);
            isAdmin = userIsAdmin;
        } else {
            isAdmin = false;
        }

        request.user = {
            id: Number(user_id),
            isAdmin: Boolean(isAdmin),
        };
        return next();
    } catch (error) {
        throw new AppError('JWT Token inválido', 401);
    }
}
