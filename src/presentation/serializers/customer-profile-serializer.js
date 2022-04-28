const serialize = ({ customerId, name, cpf, email, phone, status, createdAt, updatedAt }) => ({
  customerId,
  name,
  cpf,
  email,
  phone,
  status,
  createdAt,
  updatedAt
});

const serializeList = (payments) => payments.map((payment) => serialize(payment));

module.exports = {
  serialize,
  serializeList
};
