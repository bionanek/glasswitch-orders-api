class SequelizeError extends Error {
    constructor(message) {
        super(message);
        this.name = "SequelizeError";
        this.message = message;
        this.code = 500;
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

class ArgumentIsIncorrectType extends Error {
    constructor(message) {
        super(message);
        this.name = "ArgumentIsIncorrectType";
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
    ArgumentIsIncorrectType,
    RequestValidationError,
    UpdateError,
    IdNotFound,
    SequelizeError
};