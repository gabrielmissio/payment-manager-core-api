const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { CustomerRepository } = require('../../../../../src/infra/repositories');
const CustomerProfileFaker = require('../../../../helpers/customer-profile-faker');

const makeSut = () => ({ sut: CustomerRepository });

describe('Given the getProfileByPK function of CustomerRepository', () => {
  const customerFake = CustomerProfileFaker.getOne();

  describe('And there is no customer profile with the provided PK in the database', () => {
    test('Then I expect it returns null', async () => {
      const { sut } = makeSut();
      const response = await sut.getProfileByPK({ PK: customerFake.PK });

      expect(response.Item).toBeFalsy();
    });
  });
  describe('And there is already an customer profile with the provided PK in the database', () => {
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

    test('Then I expect it returns the customer profile with the provided PK', async () => {
      const { sut } = makeSut();
      const response = await sut.getProfileByPK({ PK: customerFake.PK });

      expect(response.Item).toEqual(customerFake);
    });
  });
});
