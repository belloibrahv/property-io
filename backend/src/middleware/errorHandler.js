// Global error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error('❌ Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';
  let details = null;

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
    details = error.details || error.message;
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
    details = error.message;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'MongoError' || error.name === 'MongooseError') {
    statusCode = 500;
    message = 'Database error';
  } else if (error.name === 'HederaError') {
    statusCode = 500;
    message = 'Blockchain error';
    details = error.message;
  } else if (error.name === 'AIError') {
    statusCode = 500;
    message = 'AI service error';
    details = error.message;
  }

  // Handle custom application errors
  if (error.statusCode) {
    statusCode = error.statusCode;
  }

  if (error.message && !message.includes('Internal server error')) {
    message = error.message;
  }

  // Prepare error response
  const errorResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  };

  // Add details in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = details || error.message;
    errorResponse.stack = error.stack;
  }

  // Add request ID if available
  if (req.requestId) {
    errorResponse.requestId = req.requestId;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

// 404 handler for undefined routes
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.url}`,
    timestamp: new Date().toISOString()
  });
};

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error classes
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    this.isOperational = true;
  }
}

class ValidationError extends Error {
  constructor(message, details = null) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.details = details;
  }
}

class HederaError extends Error {
  constructor(message, transactionId = null) {
    super(message);
    this.name = 'HederaError';
    this.statusCode = 500;
    this.transactionId = transactionId;
  }
}

class AIError extends Error {
  constructor(message, service = null) {
    super(message);
    this.name = 'AIError';
    this.statusCode = 500;
    this.service = service;
  }
}

class DatabaseError extends Error {
  constructor(message, operation = null) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
    this.operation = operation;
  }
}

// Error logging utility
const logError = (error, req = null) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    name: error.name,
    statusCode: error.statusCode || 500
  };

  if (req) {
    errorLog.request = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    };
  }

  console.error('🚨 Error logged:', errorLog);
  
  // In production, you would send this to a logging service
  // like Winston, LogRocket, or Sentry
};

// Rate limit error handler
const rateLimitErrorHandler = (req, res) => {
  res.status(429).json({
    success: false,
    error: 'Too many requests',
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: 60, // seconds
    timestamp: new Date().toISOString()
  });
};

// CORS error handler
const corsErrorHandler = (error, req, res, next) => {
  if (error.message === 'Not allowed by CORS') {
    res.status(403).json({
      success: false,
      error: 'CORS policy violation',
      message: 'Request not allowed by CORS policy',
      origin: req.headers.origin,
      timestamp: new Date().toISOString()
    });
  } else {
    next(error);
  }
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  logError,
  rateLimitErrorHandler,
  corsErrorHandler,
  AppError,
  ValidationError,
  HederaError,
  AIError,
  DatabaseError
};

