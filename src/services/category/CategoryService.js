import { AppError } from '../../utils/AppError.js';

export class CategoryService {
    constructor(repository) {
        this.repository = repository;
    }

    async index() {
        const categories = await this.repository.showAll();

        return categories;
    }

    async show(id) {
        const category = await this.repository.findById(id);

        if (!category) new AppError('Categoria não encontrada', 404);

        return category;
    }

    async create(request, response) {}

    async update(request, response) {}

    async delete(request, response) {}
}
