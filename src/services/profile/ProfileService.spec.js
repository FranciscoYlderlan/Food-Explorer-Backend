import { ProfileRepositoryInMemory } from '../../repositories/profile/RepositoryInMemory.js';
import { ProfileService } from '../profile/ProfileService.js';

describe('ProfileService', () => {
    it('should show all items', async () => {
        const Profile = [
            {
                id: 1,
                name: 'Administrador',
                description: null,
            },
            {
                id: 2,
                name: 'Usuário',
                description: null,
            },
        ];

        const profileRepositoryInMemory = new ProfileRepositoryInMemory(Profile);
        const profileService = new ProfileService(profileRepositoryInMemory);

        const result = await profileService.index();

        expect(result).toHaveLength(Profile.length);

        Profile.forEach(item => {
            expect(result).toContain(item);
        });
    });

    it('should show specific item', async () => {
        const Profile = [
            {
                id: 1,
                name: 'Administrador',
                description: null,
            },
            {
                id: 2,
                name: 'Usuário',
                description: null,
            },
        ];

        const profileRepositoryInMemory = new ProfileRepositoryInMemory(Profile);
        const profileService = new ProfileService(profileRepositoryInMemory);

        Profile.forEach(async item => {
            const [result] = await profileService.show(item.id);
            expect(result).toBe(item);
        });
    });
});
