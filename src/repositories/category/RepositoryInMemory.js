export class CategoryRepositoryInMemory {
    constructor(categories) {
        this.Categories = categories;
    }

    async showAll() {
        const categories = await this.Categories;

        return categories;
    }
    async findById(id) {
        const category = await this.Categories.filter(category => category.id == id);

        return category;
    }
}
