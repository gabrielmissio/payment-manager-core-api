const inputOne = (payload) => ({
  PK: `CLIENT#${payload.cpf}`,
  SK: 'PROFILE',
  ...payload
});

const outputOne = (payload) => {
  const { PK, SK, ...data } = payload;
  return { ...data };
};

const outputMany = (payload) => payload.Items.map((item) => outputOne(item));

module.exports = {
  inputOne,
  outputOne,
  outputMany
};
