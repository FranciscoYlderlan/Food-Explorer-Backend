import { StatusRepository } from '../repositories/status/Repository.js';
import { StatusService } from '../services/status/StatusService.js';

export class StatusController {
    async index(request, response) {
        const statusRepository = new StatusRepository();
        const statusService = new StatusService(statusRepository);

        const status = await statusService.index();

        return response.status(200).json(status);
    }

    async show(request, response) {
        const { id } = request.params;

        const statusRepository = new StatusRepository();
        const statusService = new StatusService(statusRepository);

        const status = await statusService.show(id);

        return response.status(200).json(status);
    }

    async create(request, response) {
        const { name, password, email, avatar } = request.body;

        return response.status(201).json({ name, password, email, avatar });
    }

    async update(request, response) {
        const { name, password, email, avatar } = request.body;

        return response.status(200).json({ name, password, email, avatar });
    }

    async delete(request, response) {
        const { id } = request.params;

        return response.status(202).json({ id });
    }
}
