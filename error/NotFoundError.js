const ContactAppError = require("./ContactAppError");
let { StatusCodes } = require("http-status-codes");

class NotFoundError extends ContactAppError {
  constructor(specificMessage) {
    super(
      "Invalid Parameters",
      "Validation Error",
      StatusCodes.NOT_FOUND,
      specificMessage
    );
  }
}

module.exports = NotFoundError;
