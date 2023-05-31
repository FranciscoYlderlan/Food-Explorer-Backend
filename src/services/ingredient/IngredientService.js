export class IngredientService {
    constructor(repository) {
        this.repository = repository;
    }

    async index() {
        const ingredients = await this.repository.findAll();

        return ingredients;
    }

    async show(id) {
        const ingredient = await this.repository.findById(id);

        return ingredient;
    }

    async create() {}

    async update() {}

    async delete() {}
}
