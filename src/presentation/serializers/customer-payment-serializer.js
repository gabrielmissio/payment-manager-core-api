const { serialize: planSerialize } = require('./plan-serializer');

const serialize = ({
  paymentId,
  paymentType,
  plan,
  startDate,
  endDate,
  createdBy,
  lastUpdateBy,
  createdAt,
  updatedAt
}) => ({
  paymentId,
  paymentType,
  plan: (plan && planSerialize(plan)) || undefined,
  startDate,
  endDate,
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
