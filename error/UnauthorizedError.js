const ContactAppError = require("./ContactAppError");
let { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends ContactAppError {
  constructor(specificMessage) {
    super(
      "Invalid Parameters",
      "Validation Error",
      StatusCodes.UNAUTHORIZED,
      specificMessage
    );
  }
}

module.exports = UnauthorizedError;
