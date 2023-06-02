import dayjs from '../../configs/dayjs.js';
import { AppError } from '../../utils/AppError.js';
import { hash, compare } from 'bcrypt';

export class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async index() {}
    async show() {}

    async create({ name, password, email, avatar }) {
        const emailInUse = await this.repository.findByEmail(email);

        if (emailInUse) throw new AppError('Este email já está em uso.', 409);

        const encryptedPassword = await hash(password, 8);

        // const { id: profile_id } = await this.repository.findUserProfile('Usuário');
        const updated_at = dayjs().format();
        const created_at = dayjs().format();

        await this.repository.insert({
            name,
            password: encryptedPassword,
            email,
            avatar,
            // profile_id,
            updated_at,
            created_at,
        });
    }

    async update({ id, name, password, newPassword, email, avatar }) {
        const user = await this.repository.findById(id);

        if (!user) throw new AppError('Usuário não encontrado.', 404);

        const validatedPassword = await compare(password, user.password);

        if (!validatedPassword) throw new AppError('Senha informada inválida.', 401);

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        const emailInUse = await this.repository.checkEmailInUse({
            email: user.email,
            id,
        });

        if (emailInUse) throw new AppError('Este email já está em uso.', 409);

        if (newPassword) {
            const encryptedPassword = await hash(newPassword, 8);

            user.password = encryptedPassword;
        }

        const { id: profile_id } = await this.repository.findUserProfile('Usuário');

        user.profile_id = profile_id;
        user.updated_at = dayjs().format();

        await this.repository.update(user);
    }

    async delete(id) {
        const users = await this.repository.delete(id);
        return users;
    }
}
