import { UserRepository } from '../repositories/user/Repository.js';
import { UserService } from '../services/user/UserService.js';

export class UserController {
    async index(request, response) {
        return response.status(200).json({});
    }

    async show(request, response) {
        const { id } = request.params;

        return response.status(200).json({ id });
    }

    async create(request, response) {
        const { name, password, email, avatar } = request.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.create({ name, password, email, avatar });

        return response.status(201).json({});
    }

    async update(request, response) {
        const { name, password, newPassword, email, avatar } = request.body;
        const { id } = request.params;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.update({ id, name, password, newPassword, email, avatar });

        return response.status(200).json({});
    }

    async delete(request, response) {
        const { id } = request.params;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.delete(id);

        return response.status(202).json({});
    }
}
