class APIError extends Error {
    constructor(message, status, success = false) {
        super(message);
        this.status = status;
        this.succcess = success;
    }

    toJSON() {
        return {
            success: this.succcess,
            error: this.message,
        }
    }
}

export default APIError;