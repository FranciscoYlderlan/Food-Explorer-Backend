export class StatusRepositoryInMemory {
    constructor(status) {
        this.Status = status;
    }

    async findAll() {
        const status = await this.Status;

        return status;
    }
    async findById(id) {
        const status = await this.Status.filter(status_ => status_.id == id);

        return status;
    }
}
