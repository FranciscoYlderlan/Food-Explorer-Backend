import { AppError } from '../../utils/AppError.js';

export class StatusService {
    constructor(repository) {
        this.repository = repository;
    }

    async index() {
        const status = await this.repository.findAll();

        return status;
    }

    async show(id) {
        const status = await this.repository.findById(id);

        if (!status) new AppError('Status não encontrado', 404);

        return status;
    }

    async create(request, response) {}

    async update(request, response) {}

    async delete(request, response) {}
}
