import { UserRepositoryInMemory } from '../../repositories/user/RepositoryInMemory.js';
import { UserService } from '../user/UserService.js';

describe('UserService', () => {
    it('should create a item', async () => {
        const Users = [
            {
                name: 'José',
                password: '123456',
                email: 'josezao@dagaleraegentefina.com',
                avatar: null,
            },
            {
                name: 'Robertinho',
                password: '123456',
                email: 'robertinho@empessoa.com',
                avatar: null,
            },
            {
                name: 'Cazalbé',
                password: '123456',
                email: 'cazalbé@operigotedasmuié.com',
                avatar: null,
            },
        ];
        const Profiles = [
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

        const user = {
            name: 'Rogerinho de Ingá',
            password: '123456',
            email: 'rogerinho@penseemmimchorepormim.com',
            avatar: null,
        };

        const userRepositoryInMemory = new UserRepositoryInMemory(Users, Profiles);
        const userService = new UserService(userRepositoryInMemory);

        await userService.create(user);

        expect(Users.some(u => u.name === user.name && u.email === user.email)).toBeTruthy();
    });
    it('should update a item', async () => {
        const Users = [
            {
                id: 1,
                name: 'José',
                password: '123456',
                email: 'josezao@dagaleraegentefina.com',
                avatar: null,
            },
            {
                id: 2,
                name: 'Robertinho',
                password: '$2a$08$6SVB3L1Cntbywr5sFtrAOuVJMlsHDbW0cnZxkUkmQwwijxg9mlFQ.',
                email: 'robertinho@empessoa.com',
                avatar: null,
            },
            {
                id: 3,
                name: 'Cazalbé',
                password: '123456',
                email: 'cazalbé@operigotedasmuié.com',
                avatar: null,
            },
        ];
        const Profiles = [
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

        const user = {
            id: 2,
            name: 'Rogerinho de Ingá',
            password: '123456',
            newPassword: '123',
            email: 'rogerinho@penseemmimchorepormim.com',
            avatar: null,
        };

        const userRepositoryInMemory = new UserRepositoryInMemory(Users, Profiles);
        const userService = new UserService(userRepositoryInMemory);

        await userService.update(user);

        expect(Users.some(u => u.name === user.name && u.email === user.email)).toBeTruthy();
    });
    it('should delete a item', async () => {
        const Users = [
            {
                name: 'José',
                password: 123456,
                email: 'josezao@dagaleraegentefina.com',
                avatar: null,
            },
            {
                name: 'Robertinho',
                password: 123456,
                email: 'robertinho@empessoa.com',
                avatar: null,
            },
            {
                name: 'Cazalbé',
                password: 123456,
                email: 'cazalbé@operigotedasmuié.com',
                avatar: null,
            },
        ];
        const Profiles = [
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

        const idToDelete = 2;
        const initialUsersLength = Users.length;

        const userRepositoryInMemory = new UserRepositoryInMemory(Users, Profiles);
        const userService = new UserService(userRepositoryInMemory);

        const users = await userService.delete(idToDelete);

        const filteredUsers = users.filter(user => user.id === idToDelete);

        expect(Users.length).toBe(initialUsersLength - filteredUsers.length);
    });
});
