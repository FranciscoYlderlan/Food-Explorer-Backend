export class ProfileRepositoryInMemory {
    constructor(profiles) {
        this.Profiles = profiles;
    }

    async findAll() {
        const profiles = this.Profiles;

        return profiles;
    }
    async findById(id) {
        const profile = this.Profiles.filter((profile) => profile.id == id);

        return profile;
    }
}
