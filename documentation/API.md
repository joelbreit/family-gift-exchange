# API Endpoints

## User Account Creation

* API Call: createAccount
* Method: POST
* Data Sent
  * User's first name: string
  * Password: string
* Data Received
  * Success message

## User Login

* API Call: login
* Method: POST
* Data Sent
  * User's first name: string
  * Password: string
* Data Received
  * Authentication token/session ID: string

## Retrieve Assigned Gift Recipient

* API Call: getRecipient
* Method: GET
* Data Sent
  * Authentication token/session ID: string
* Data Received
  * Recipient's first name: string
  * Wishlist URL: string

## (Optional) Retrieve Names List

* API Call: getNames
* Method: GET
* Data Sent: None
* Data Received
  * List of names: string[]

## (Optional) Update Password

* API Call: updatePassword
* Method: POST
* Data Sent
  * Authentication token/session ID: string
  * Old password: string
  * New password: string
* Data Received
  * Success message


