const { InternalServerError, NotFoundError } = require('../../utils/errors');

const ok = (data) => ({ data, code: 200 });

const created = (data) => ({ data, code: 201 });

const badRequest = (error) => ({ data: { error: error.message }, code: 400 });

const notFound = (error) => ({ data: { error: new NotFoundError(error).message }, code: 404 });

const exceptionHandler = (error) => ({
  code: error.code || 500,
  data: { error: error.description || new InternalServerError().message }
});

module.exports = {
  ok,
  created,
  badRequest,
  notFound,
  exceptionHandler
};
