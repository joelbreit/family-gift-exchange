# AWS Setup Instuctions

## S3

1. Go to S3
2. Select 'Create Bucket'
3. Enter a name (family-gift-exchange-app-data)
4. US-East-1
5. Use default settings

## IAM

1. Go to IAM
2. Roles
3. Select 'Create Role'
4. Choose AWS service as the trusted entity
5. Select Lambda as the use case
6. 'AmazonS3FullAccess'
7. Name it (LambdaS3FullAccessRole)

## Lambda

1. Go to Lambda
2. Select 'Create Function'
3. Enter a name (e.g. CreateAccountFunction)
4. Use Node.js (default)
5. Use default settings
6. Configuration tab -> Permissions -> Execution role -> Edit
7. Select 'Use an existing role'
8. Add 'LambdaS3FullAccessRole'
9.  Add code to index.mjs
10. Add test data to event.json and save
11. Deploy
12. Test

## API Gateway

1. Go to API Gateway
2. Select 'Create API'
3. Choose HTTP API and click 'Build'
4. Click 'Add Integration'
5. Select Lambda
6. Choose the region and function
8. Name it (FamilyGiftExchangeAPI)
7. Click 'Next'
8. Set method and path
9. Default stage
10. Create


## Amplify
