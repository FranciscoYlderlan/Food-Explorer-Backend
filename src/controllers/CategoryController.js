import { CategoryRepository } from '../repositories/category/Repository.js';
import { CategoryService } from '../services/category/CategoryService.js';

export class CategoryController {
    async index(request, response) {
        const categoryRepository = new CategoryRepository();
        const categoryService = new CategoryService(categoryRepository);

        const categories = await categoryService.index();

        return response.status(200).json(categories);
    }

    async show(request, response) {
        const { id } = request.params;

        const categoryRepository = new CategoryRepository();
        const categoryService = new CategoryService(categoryRepository);

        const category = await categoryService.show(id);

        return response.status(200).json(category);
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
