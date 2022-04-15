const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { ClientRepository } = require('../../../../../src/infra/repositories');
const ClientProfileFaker = require('../../../../helpers/client-profile-faker');

const makeSut = () => ({ sut: ClientRepository });

describe('Given the updateProfileByPK function of ClientRepository', () => {
  const clientFake = ClientProfileFaker.getOne();
  const clientFakeNewParams = ClientProfileFaker.getOne();

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

  test('Then I expect its update the provided prameters of the client in the dataBase', async () => {
    const { sut } = makeSut();
    delete clientFakeNewParams.PK;

    await sut.updateProfileByPK({ PK: clientFake.PK, ...clientFakeNewParams });

    const db = await DYNAMODB_DOCUMENT_CLIENT.get({
      TableName: PAYMENT_MANAGER_TABLE_NAME,
      Key: { PK: clientFake.PK, SK: 'PROFILE' }
    }).promise();

    expect(db.Item).toBeTruthy();
    expect(db.Item).toEqual({
      PK: clientFake.PK,
      ...clientFakeNewParams
    });
  });
});
