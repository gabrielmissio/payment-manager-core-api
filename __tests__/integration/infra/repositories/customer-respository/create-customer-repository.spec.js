const { DYNAMODB_DOCUMENT_CLIENT } = require('../../../../../src/main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../../../../src/main/config/env');
const { CustomerRepository } = require('../../../../../src/infra/repositories');
const CustomerFaker = require('../../../../helpers/customer-faker');

const makeSut = () => ({ sut: CustomerRepository });

describe('Given the create function of CustomerRepository', () => {
  const customerFake = CustomerFaker.getOne();

  afterAll(async () => {
    await DYNAMODB_DOCUMENT_CLIENT.delete({
      TableName: PAYMENT_MANAGER_TABLE_NAME,
      Key: {
        PK: customerFake.PK,
        SK: customerFake.SK
      }
    }).promise();
  });

  test('Then I expect its save the customer in the dataBase', async () => {
    const { sut } = makeSut();
    await sut.createCustomer(customerFake);

    const db = await DYNAMODB_DOCUMENT_CLIENT.get({
      TableName: PAYMENT_MANAGER_TABLE_NAME,
      Key: { PK: customerFake.PK, SK: 'PROFILE' }
    }).promise();

    expect(db.Item).toBeTruthy();
    expect(db.Item).toEqual(customerFake);
  });
});
