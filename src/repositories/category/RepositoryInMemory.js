export class CategoryRepositoryInMemory {
    constructor(categories) {
        this.Categories = categories;
    }

    async showAll() {
        const categories = this.Categories;

        return categories;
    }
    async findById(id) {
        const category = this.Categories.filter(category => category.id == id);

        return category;
    }
}
