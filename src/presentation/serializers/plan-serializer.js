const serialize = ({ planId, description, value, status, createdBy, lastUpdateBy, createdAt, updatedAt }) => ({
  planId,
  description,
  value,
  status,
  createdBy,
  lastUpdateBy,
  createdAt,
  updatedAt
});

const serializeList = (plans) => plans.map((plan) => serialize(plan));

module.exports = {
  serialize,
  serializeList
};
