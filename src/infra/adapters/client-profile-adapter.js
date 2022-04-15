const inputOne = (payload) => ({
  PK: `CLIENT#${payload.cpf}`,
  SK: 'PROFILE',
  ...payload
});

const outputOne = ({ Item }) => {
  if (!Item) return null;

  const { PK, SK, ...data } = Item;
  return { ...data };
};

const outputMany = (payload) => payload.Items.map((Item) => outputOne({ Item }));

module.exports = {
  inputOne,
  outputOne,
  outputMany
};
