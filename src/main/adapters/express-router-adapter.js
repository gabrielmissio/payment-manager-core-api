const adapt = (router) => async (req, res) => {
  const request = {
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers
  };

  const response = await router(request);
  return res.status(response.code).json(response.data);
};

module.exports = { adapt };
