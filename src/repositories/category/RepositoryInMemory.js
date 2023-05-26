export class CategoryRepositoryInMemory {
    constructor(categories) {
        this.Categories = categories;
    }

    async findAll() {
        const categories = await this.Categories;

        return categories;
    }
    async findById(id) {
        const category = await this.Categories.filter(category => category.id == id);

        return category;
    }
}
