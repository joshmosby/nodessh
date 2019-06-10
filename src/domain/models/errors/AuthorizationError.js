function AuthorizationError(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = message;
    this.name = "Authorization";
}

module.exports = AuthorizationError;