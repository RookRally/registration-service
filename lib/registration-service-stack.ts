import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";

export class RegistrationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "rookrally", {
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
    });
    userPool.addClient("rookrallyClient");

    const postConfirmationLambda = new lambda.NodejsFunction(
      this,
      "PostConfirmationLambda",
      {
        entry: "lambdas/postConfirmation/index.ts",
      },
    );

    userPool.addTrigger(
      cognito.UserPoolOperation.POST_CONFIRMATION,
      postConfirmationLambda,
    );
  }
}
