import { PublishCommand } from "@aws-sdk/client-sns";
// snippet-start:[sns.JavaScript.createclientv3]
import { SNSClient } from "@aws-sdk/client-sns";

// The AWS Region can be provided here using the `region` property. If you leave it blank
// the SDK will default to the region set in your AWS config.
export const snsClient = new SNSClient({
  region: 'ap-southeast-1'
});

export const publish = async (
  message = JSON.stringify(
    {
      payload: "3iVNHTQm3GXFoxNMMsunw26fJ2D51Asxmq7h9HNtSzKtfGY59swBbEJ13EJdocN6Gq9hjHdNZNqESBALjo6DgdoT"
    }
  ),
  topicArn = process.env.SNS_TOPIC_ARN,
) => {
  const response = await snsClient.send(
    new PublishCommand({
      Message: message,
      TopicArn: topicArn,
    }),
  );
  console.log(response);
  // {
  //   '$metadata': {
  //     httpStatusCode: 200,
  //     requestId: 'e7f77526-e295-5325-9ee4-281a43ad1f05',
  //     extendedRequestId: undefined,
  //     cfId: undefined,
  //     attempts: 1,
  //     totalRetryDelay: 0
  //   },
  //   MessageId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  // }
  return response;
};
// snippet-end:[sns.JavaScript.topics.publishMessagesV3]

// Invoke main function if this file was run directly.
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   publish();
// }

publish();