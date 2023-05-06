
export class ProfileRepositoryInMemory {

    Profile = []

    async showAll(){
        const profiles = this.Profile;
        
        return profiles;
    }
    async findById(id) {
        const profile = this.Profile.filter(profile => profile.id == id);
    
        return profile;
    }
}