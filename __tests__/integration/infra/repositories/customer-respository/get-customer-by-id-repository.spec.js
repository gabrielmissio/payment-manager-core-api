const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { CustomerRepository } = require('../../../../../src/infra/repositories');
const { CustomerAdapter } = require('../../../../../src/infra/adapters');
const CustomerFaker = require('../../../../helpers/customer-faker');

const makeSut = () => ({ sut: CustomerRepository });

describe('Given the getCustomerById function of CustomerRepository', () => {
  const customerFake = CustomerFaker.getOne();

  describe('And there is no customer with the provided id in the database', () => {
    test('Then I expect it returns null', async () => {
      const { sut } = makeSut();
      const response = await sut.getCustomerById(customerFake.PK);

      expect(response).toBeFalsy();
    });
  });
  describe('And there is already an customer with the provided id in the database', () => {
    beforeAll(async () => {
      await DYNAMODB_DOCUMENT_CLIENT.put({
        TableName: PAYMENT_MANAGER_TABLE_NAME,
        Item: customerFake
      }).promise();
    });

    afterAll(async () => {
      await DYNAMODB_DOCUMENT_CLIENT.delete({
        TableName: PAYMENT_MANAGER_TABLE_NAME,
        Key: {
          PK: customerFake.PK,
          SK: customerFake.SK
        }
      }).promise();
    });

    test('Then I expect it returns the customer with the provided id', async () => {
      const { sut } = makeSut();
      const response = await sut.getCustomerById(customerFake.PK);

      expect(response).toEqual(CustomerAdapter.outputOne(customerFake));
    });
  });
});
