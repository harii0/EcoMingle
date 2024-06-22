class ApiError extends Error {
    constructor(status, message, errors = [], stack = "") {
        this.status = status;
        this.data = null;
        this.message = message;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
