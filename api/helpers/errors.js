class RequestValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "RequestValidationError";
        this.message = message;
        this.code = 400;
    }

    toJSON() {
        return {
            error: {
                errorCode: this.code,
                name: this.name,
                message: this.message,
                stacktrace: this.stack
            }
        };
    }
}

class ArgumentIsNotIntError extends Error {
    constructor(message) {
        super(message);
        this.name = "ArgumentIsNotIntError";
        this.message = message;
        this.code = 400;
    }

    toJSON() {
        return {
            error: {
                errorCode: this.code,
                name: this.name,
                message: this.message,
                stacktrace: this.stack
            }
        }
    }
}

class UpdateError extends Error {
    constructor(message) {
        super(message);
        this.name = "UpdateError";
        this.message = message;
        this.code = 400;
    }

    toJSON() {
        return {
            error: {
                errorCode: this.code,
                name: this.name,
                message: this.message,
                stacktrace: this.stack
            }
        }
    }
}

class IdNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "IDError";
        this.message = message;
        this.code = 404;
    }

    toJSON() {
        return {
            error: {
                errorCode: this.code,
                name: this.name,
                message: this.message,
                stacktrace: this.stack
            }
        }
    }
}

module.exports = {
    ArgumentIsNotIntError,
    RequestValidationError,
    UpdateError,
    IdNotFound
};