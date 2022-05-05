# payment-manager-api

## deploy DynamoDB table

```bash
aws --region <REGION> cloudformation create-stack --stack-name payment-manager-table-<STAGE> --template-body file://resources/cf/payment-manager-dynamodb-table.yaml --parameters ParameterKey=StageName,ParameterValue=<STAGE>
```
