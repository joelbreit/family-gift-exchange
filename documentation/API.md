# API Endpoints

## User Account Creation

* API Call: createAccount
* Method: POST
* Data Sent
  * User's first name: string
  * Password: string
* Data Received
  * Success message
    * 400 Bad Request if password has already been set
    * 404 Not Found if user not found
    * 500 Internal Server Error if database error
    * 200 OK if successful

## User Login

* API Call: login
* Method: POST
* Data Sent
  * User's first name: string
  * Password: string
* Data Received
  * Success message
    * 400 Bad Request if password has not been set
    * 401 Unauthorized if password is incorrect
    * 404 Not Found if user not found
    * 500 Internal Server Error if database error
    * 200 OK if successful

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


