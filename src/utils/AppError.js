export class AppError {
    constructor(description, statusCode=400) {
        this.description = description;
        this.statusCode = statusCode;
    }

    static ServerErrorMessage() {
        return {
            error: 500,
            description: "Internal server error"
        }
    }
    
    message() {
        return {
            error: this.statusCode,
            description: this.description
        }
    }
    
}