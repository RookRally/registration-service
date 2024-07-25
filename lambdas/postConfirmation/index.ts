import { SNS } from "aws-sdk";

const sns = new SNS();

export async function handler(event: any, context: any) {
  console.log(
    `Post confirmation for user ${event.userName} with id ${event.request.userAttributes.sub}`,
  );

  const userSignedUpEvent = {
    userId: event.request.userAttributes.sub,
    username: event.userName,
  };
  const message = {
    Message: JSON.stringify(userSignedUpEvent),
    TopicArn: process.env.USER_SIGNED_UP_TOPIC_ARN,
  };

  try {
    const result = await sns.publish(message).promise();
    console.log(
      `Message ${message.Message} sent to the topic ${message.TopicArn}`,
    );
    console.log("MessageID is " + result.MessageId);
  } catch (error) {
    console.error(error);
  }

  return event;
}
