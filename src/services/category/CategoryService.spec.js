import { CategoryRepositoryInMemory } from '../../repositories/category/RepositoryInMemory.js';
import { CategoryService } from '../category/CategoryService.js';

describe('CategoryService', () => {
    it('should show all items', async () => {
        const Category = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];
        const categoryRepositoryInMemory = new CategoryRepositoryInMemory(Category);
        const categoryService = new CategoryService(categoryRepositoryInMemory);
        const result = await categoryService.index();

        expect(result).toHaveLength(Category.length);

        Category.forEach(item => {
            expect(result).toContain(item);
        });
    });

    it('should show specific item', async () => {
        const Category = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory(Category);
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        Category.forEach(async item => {
            const [result] = await categoryService.show(item.id);
            expect(result).toBe(item);
        });
    });
});
