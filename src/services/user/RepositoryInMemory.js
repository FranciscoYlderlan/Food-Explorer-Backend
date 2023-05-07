export class UserRepository {
    constructor({ users, profiles }) {
        this.Users = users;
        this.Profiles = profiles;
    }

    async findByEmail(email) {
        const user = await this.Users().where({ email }).first();

        return user;
    }

    async findUserProfile(name) {
        const profile = await this.Profiles()
            .whereLike('name', `%${name}%`)
            .first();

        return profile;
    }

    async insert({ name, password, email, avatar, profile_id }) {
        const user = await this.Users().insert({
            name,
            password,
            email,
            avatar,
            profile_id,
        });

        return user;
    }
}
