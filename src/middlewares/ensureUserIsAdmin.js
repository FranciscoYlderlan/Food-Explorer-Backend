import { AppError } from '../utils/AppError.js';

export function ensureUserIsAdmin(request, response, next) {
    const { isAdmin } = request.user;

    if (!isAdmin) throw new AppError('Este usuário não possui permissões de acesso.', 401);
 
    return next();
}
