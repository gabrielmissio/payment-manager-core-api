const serialize = ({ paymentId, value, paymentType, createdBy, lastUpdateBy, createdAt, updatedAt }) => ({
  paymentId,
  value,
  paymentType,
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
