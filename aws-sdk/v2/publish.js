var AWS = require('aws-sdk');

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

AWS.config.update({region: 'ap-southeast-1'});

console.log("Region: ", AWS.config.region);

var sns = new AWS.SNS();

var params = {
  Message: '41n9XoK3Hp3o71okGVmuhNwx7jWNio9ztymXQm8SJEcsur5tvYkqFXsWgcZBgc9hPZWGHpBCEn67LkaQmTQvQ8wA', /* required */
  TopicArn: 'arn:aws:sns:ap-southeast-1:255172291864:testSNSTopic'
};

sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});