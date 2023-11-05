class APIError extends Error {
    constructor(message, status, success = false,) {
        super(message);
        this.status = status;
        this.success = success;
    }

    toJSON() {
        return {
            success: this.success,
            error: this.message,
        }
    }
}

module.exports = APIError;