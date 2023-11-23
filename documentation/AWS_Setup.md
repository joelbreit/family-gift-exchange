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

### Create Function

1. Go to Lambda
2. Select 'Create Function'
3. Enter a name (e.g. CreateAccountFunction)
4. Use Node.js (default)
5. Use default settings

### Add IAM Role

6. Configuration tab -> Permissions -> Execution role -> Edit
7. Select 'Use an existing role'
8. Add 'LambdaS3FullAccessRole'
9.  Add code to index.mjs
10. Add test data to event.json and save
11. Deploy
12. Test

## API Gateway

### Create API

1. Go to API Gateway
2. Select 'Create API'
3. Choose HTTP API and click 'Build'
4. Click 'Add Integration'
5. Select Lambda
6. Choose the region and function
7. Name it (FamilyGiftExchangeAPI)
8. Click 'Next'
9. Set method and path
10. Default stage
11. Create
    
### Create Extra Routes

1. Go to API Gateway
2. Select the API
3. Select 'Create'
4. Select method and path
5. 'Add Integration'
6. 'Create and attach an integration'
7. Select Lambda, region, and function

### CORS

1. In API Gateway, select the API
2. CORS on the left
3. Configure
4. Add '*' to Access-Control-Allow-Origin and Access-Control-Allow-Headers
5. Allow [POST, GET, and OPTIONS] methods
6. Save

## Amplify

### Create App

1. Go to Amplify
2. Select 'Create App'
3. Name it (family-gift-exchange)

### Domain

1. Go to Amplify
2. Select the app
3. Domain management
4. Add domain
5. Enter a domain name (giftexchange.breitest.com)
6. Amplify automatically adds the CNAME record to Route 53

## ~~SES~~ (this was tried but not used)

### ~~Get Started~~
1. Go to SES
2. "Get Started"
3. Provide an email that you have access to
4. Provide a name (breitest.com)

### ~~Verify Domain~~

1. Under "Verify sending domain", select Get DNS Records
2. Go to your hosted zone in Route53
3. Add the CNAME records