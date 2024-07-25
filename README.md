# Registration Service

This service contains the user pool for RookRally.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Test user creation (without UI)
In order to test creating a new user and invoking all subsequent events, execute the following commands:

1. sign up a new user
       
        aws cognito-idp sign-up \
           --client-id <app_client_id> \
           --username <test_username> \
           --password <test_password>

    You'll find the `app_client_id` in the AWS console (user pool -> App integration -> App clients and analytics).
    For `test_password` you have to choose a password which conforms to password rules, e.g. `Abc1234!`.

2. confirm the user (this simulates the user clicking on the confirmation link in the signup mail)

       aws cognito-idp admin-confirm-sign-up \
           --user-pool-id <user_pool_id> \
           --username <test_username>

    You'll find the `user_pool_id` in the AWS console. For `test_username` choose the same as in step 1.
