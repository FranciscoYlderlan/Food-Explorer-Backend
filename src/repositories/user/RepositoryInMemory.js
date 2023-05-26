export class UserRepositoryInMemory {
    constructor(users, profiles) {
        this.Users = users;
        this.Profiles = profiles;
    }

    async findById(id) {
        const [user] = await this.Users.filter(user => user.id == id);

        return user;
    }

    async findByEmail(email) {
        const [user] = await this.Users.filter(user => user.email == email);

        return user;
    }

    async checkEmailInUse({ email, id = null }) {
        let user = [];

        if (id) {
            [user] = await this.Users.filter(
                user => user.email.toLowerCase() == email.toLowerCase() && user.id !== id
            );
        } else {
            [user] = await this.Users.filter(
                user => user.email.toLowerCase() == email.toLowerCase()
            );
        }

        return user;
    }

    async findUserProfile(name) {
        const [profile] = await this.Profiles.filter(profile =>
            profile.name.toLowerCase().includes(name.toLowerCase())
        );
        return profile;
    }

    async insert({ name, password, email, avatar, profile_id, updated_at, created_at }) {
        const id = Math.floor(Math.random() * 100);
        await this.Users.push({
            id,
            name,
            password,
            email,
            avatar,
            profile_id,
            updated_at,
            created_at,
        });

        return this.Users;
    }

    async update({ id, name, password, email, avatar, profile_id, updated_at }) {
        this.Users = await this.Users.map(user => {
            if (user.id === id) {
                return {
                    id: user.id,
                    name,
                    password,
                    email,
                    avatar,
                    profile_id,
                    updated_at,
                    created_at: user.created_at,
                };
            }
            return user;
        });
        const user = this.Users.filter(user => user.id == id);

        return user;
    }

    async delete(id) {
        this.Users = await this.Users.filter(user => user.id !== id);

        return this.Users;
    }
}
