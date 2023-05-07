import knex from '../../database/knex/index.js';

export class UserRepository {
    constructor() {
        this.Users = () => knex('user');
        this.Profiles = () => knex('profile');
    }

    async findById(id) {
        const user = await this.Users().where({ id }).first();

        return user;
    }

    async findByEmail(email) {
        const user = await this.Users().where({ email }).first();

        return user;
    }

    async checkEmailInUse({ email, id }) {
        const user = await this.Users().where({ email }).whereNot({ id }).first();

        return user;
    }

    async findUserProfile(name) {
        const profile = await this.Profiles().whereLike('name', `%${name}%`).first();

        return profile;
    }

    async insert({ name, password, email, avatar, profile_id, updated_at, created_at }) {
        const user = await this.Users().insert({
            name,
            password,
            email,
            avatar,
            profile_id,
            updated_at,
            created_at,
        });

        return user;
    }

    async update({ id, name, password, email, avatar, profile_id, updated_at }) {
        const user = await this.Users()
            .update({
                name,
                password,
                email,
                avatar,
                profile_id,
                updated_at,
            })
            .where({ id });

        return user;
    }

    async delete(id) {
        const user = await this.Users().where({ id }).del();

        return user;
    }
}
