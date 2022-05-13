const serialize = ({ customerId, name, cpf, email, phone, status, createdBy, lastUpdateBy, createdAt, updatedAt }) => ({
  customerId,
  name,
  cpf,
  email,
  phone,
  status,
  createdBy,
  lastUpdateBy,
  createdAt,
  updatedAt
});

const serializeList = (payments) => payments.map((payment) => serialize(payment));

module.exports = {
  serialize,
  serializeList
};
