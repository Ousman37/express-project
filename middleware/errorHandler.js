const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
  try {
    console.log('Error handler called:', err);

    let statusCode;
    let message;

    switch (err.name) {
      case 'ValidationError':
        statusCode = constants.VALIDATION_ERROR;
        message = err.message;
        break;
      case 'UnauthorizedError':
        statusCode = constants.UNAUTHORIZED;
        message = err.message;
        break;
      case 'ForbiddenError':
        statusCode = constants.FORBIDDEN;
        message = err.message;
        break;
      case 'NotFoundError':
        statusCode = constants.NOT_FOUND;
        message = err.message;
        break;
      default:
        statusCode = constants.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
        break;
    }

    res.status(statusCode).json({
      error: true,
      status: statusCode,
      message: message,
      stackTrace: err.stack,
    });
  } catch (err) {
    console.log('Error caught in errorHandler:', err);
    res.status(500).json({
      error: true,
      status: 500,
      message: 'Internal server error',
      stackTrace: err.stack,
    });
  }
};

module.exports = errorHandler;
