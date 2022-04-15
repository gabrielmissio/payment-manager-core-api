class ConflictError extends Error {
  constructor(description) {
    super(`Conflict Error: ${description}`);
    this.description = description;
    this.code = 409;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
