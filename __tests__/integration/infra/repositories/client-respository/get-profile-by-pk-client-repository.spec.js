const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { ClientRepository } = require('../../../../../src/infra/repositories');
const ClientProfileFaker = require('../../../../helpers/client-profile-faker');

const makeSut = () => ({ sut: ClientRepository });

describe('Given the getProfileByPK function of ClientRepository', () => {
  const clientFake = ClientProfileFaker.getOne();

  describe('And there is no client profile with the provided PK in the database', () => {
    test('Then I expect it returns null', async () => {
      const { sut } = makeSut();
      const response = await sut.getProfileByPK({ PK: clientFake.PK });

      expect(response.Item).toBeFalsy();
    });
  });
  describe('And there is already an client profile with the provided PK in the database', () => {
    beforeAll(async () => {
      await DYNAMODB_DOCUMENT_CLIENT.put({
        TableName: PAYMENT_MANAGER_TABLE_NAME,
        Item: clientFake
      }).promise();
    });

    afterAll(async () => {
      await DYNAMODB_DOCUMENT_CLIENT.delete({
        TableName: PAYMENT_MANAGER_TABLE_NAME,
        Key: {
          PK: clientFake.PK,
          SK: clientFake.SK
        }
      }).promise();
    });

    test('Then I expect it returns the client profile with the provided PK', async () => {
      const { sut } = makeSut();
      const response = await sut.getProfileByPK({ PK: clientFake.PK });

      expect(response.Item).toEqual(clientFake);
    });
  });
});
