const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { ClientRepository } = require('../../../../../src/infra/repositories');
const ClientProfileFaker = require('../../../../helpers/client-profile-faker');

const makeSut = () => ({ sut: ClientRepository });

describe('Given the create function of ClientRepository', () => {
  const clientFake = ClientProfileFaker.getOne();

  afterAll(async () => {
    await DYNAMODB_DOCUMENT_CLIENT.delete({
      TableName: PAYMENT_MANAGER_TABLE_NAME,
      Key: {
        PK: clientFake.PK,
        SK: clientFake.SK
      }
    }).promise();
  });

  test('Then I expect its save the client in the dataBase', async () => {
    const { sut } = makeSut();
    await sut.create({ client: clientFake });

    const db = await DYNAMODB_DOCUMENT_CLIENT.get({
      TableName: PAYMENT_MANAGER_TABLE_NAME,
      Key: { PK: clientFake.PK, SK: 'PROFILE' }
    }).promise();

    expect(db.Item).toBeTruthy();
    expect(db.Item).toEqual(clientFake);
  });
});
