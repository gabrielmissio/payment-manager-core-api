class NotFoundError extends Error {
  constructor(description) {
    super(`Not Found Error: ${description}`);
    this.description = description;
    this.code = 404;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
