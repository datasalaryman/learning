# SNS Trigger AWS SDK v3


## Build image

```
docker build -t test_sdk .
```

## Run container

```
docker run -it -d --name test_sdk_run --env-file .env test_sdk
```

Then go into the terminal of the docker container and run the following:

```
node publish.js
```

The following output should appear

```
{
  '$metadata': {
    httpStatusCode: 200,
    requestId: 'cd253166-b90c-559b-aeb4-6f7074b7c770',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  MessageId: '630d6721-dc32-56f1-9f66-39371189941a'
}
```