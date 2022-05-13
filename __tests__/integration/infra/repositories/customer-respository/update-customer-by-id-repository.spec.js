const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { CustomerRepository } = require('../../../../../src/infra/repositories');
const CustomerFaker = require('../../../../helpers/customer-faker');

const makeSut = () => ({ sut: CustomerRepository });

describe('Given the updateCustomerById function of CustomerRepository', () => {
  const customerFake = CustomerFaker.getOne();
  const customerFakeNewParams = CustomerFaker.getOne();

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

  test('Then I expect its update the provided prameters of the customer in the dataBase', async () => {
    const { sut } = makeSut();
    delete customerFakeNewParams.PK;

    await sut.updateCustomerById({ PK: customerFake.PK, ...customerFakeNewParams });

    const db = await DYNAMODB_DOCUMENT_CLIENT.get({
      TableName: PAYMENT_MANAGER_TABLE_NAME,
      Key: { PK: customerFake.PK, SK: 'PROFILE' }
    }).promise();

    expect(db.Item).toBeTruthy();
    expect(db.Item).toEqual({
      PK: customerFake.PK,
      ...customerFakeNewParams
    });
  });
});
