<h1  align="center">PAYMENT-MANAGER-CORE-API</h1>

  
  

## Overview

  
 
  
 This repository is responsible for the core operations of the application, such as CRUD operations of clients, plans and payments.
  
  
  

## Technologies

  
  
  

- [Nodejs (v 14.17)](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Express](https://www.npmjs.com/package/express)
- [Serverless Framework](https://www.serverless.com/)
- [DynamoDB](https://aws.amazon.com/dynamodb)
- [AWS lambda](https://aws.amazon.com/lambda)
- [AWS-SDK](https://www.npmjs.com/package/aws-sdk)
- [Docker](https://www.docker.com/)
- [Jest](https://www.npmjs.com/package/jest)
- [Husky](https://www.npmjs.com/package/husky)
- [ESLint](https://www.npmjs.com/package/eslint)

  
  
  

## Related Repositories




- [PAYMENT-MANEGER-TOOLS](https://github.com/gabrielmissio/payment-manager-tools)
- [PAYMENT-MANEGER-AUTH_API](https://github.com/gabrielmissio/payment-manager-auth-api)

  
  

## Project anatomy




```
app
 └ __test__                         → Source folder for unit, integration and features tests
 └ .husky                           → Source folder for husky hook scripts
 └ my-dynamodb-data (generated)     → Dynamodb-Local data
 └ node_modules (generated)         → NPM dependencies
 └ src                              → Application sources 
    └ domain                           → Application services layer
       └ services                         → Application business rules  
    └ infra                            → Application infrastructure layer
       └ adapters                         → Conuciation contracts between the domain layer and the infrastructure layer
       └ helpers                          → Database implementation helpers
       └ migrations                       → Script to create and delete dyanmodbLocal tables
       └ repositories                     → Database operations
       └ seeders                          → Script to put and delete dyanmodbLocal items
    └ main                             → Application main layer
       └ adapters                         → adpters
       └ config                           → config
       └ middlewares                      → middlewares
    └ presentation                     → Application presentation layer
       └ controllers                      → Application requests handler
       └ helpers                          → Presentation helpers
       └ serializers                      → Objects formatters
    └ utils                            → Application utils
       └ enums                            → enums
       └ errors                           → errors
       └ helpers                          → helpers
 └ index-app                        → Application entry point
 └ ...                              → Other files
 ```




## Deployment Instructions  
  
 


### Install Dependencies

  


```bash
npm install --production
```
 



### Deploy API

  
  

```bash
sls deploy --verbose --stage <STAGE> --region <REGION>
```



## Running on Localhost
  
 


### Install Dependencies

  


```bash
npm install
```
 

### Run Migrations and Seeders

  
  

```bash
# replace start with undo to reverse the given operation
npm run migrations-start
npm run seeders-start
```




### Start API

  
  

```bash
# omit the REGION parameter to point to the local database
npm run start:dev -- --region <REGION>
```
  
  
  

## License
  
  
  

[LICENSE](/LICENSE)
