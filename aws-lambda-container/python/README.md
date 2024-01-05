# Python AWS Lambda container

## Build and run

```
docker image rm -f test_docker_lambda && docker build -t test_docker_lambda .
docker container rm -f test_docker_lambda_run && docker run -d -it --name test_docker_lambda_run -p 9000:8080 test_docker_lambda
```

## Testing

On a separate terminal run the following:

```
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '
  {
    "Records": [
      {
        "Sns": { 
          "Message": "{\"payload\": \"41n9XoK3Hp3o71okGVmuhNwx7jWNio9ztymXQm8SJEcsur5tvYkqFXsWgcZBgc9hPZWGHpBCEn67LkaQmTQvQ8wA\"}"
        }
      }
    ]
  }'
```

and check logs for the tx json RPC

```
2024-01-05 05:57:08.531 | INFO     | main:handler:20 - {'jsonrpc': '2.0', 'result': {'slot': 238489504, 'transaction': {'signatures': ['41n9XoK3Hp3o71okGVmuhNwx7jWNio9ztymXQm8SJEcsur5tvYkqFXsWgcZBgc9hPZWGHpBCEn67LkaQmTQvQ8wA', '4oCfQLH2duWBudowsp7ph1p5RN8DvPp7iNozSNDKt7zudquRTjMe2zPjfUd92T4sPKfmZM7XuEAEdu6AiaGfeqJc'], 'message': {'header': {'numRequiredSignatures': 2, 'numReadonlySignedAccounts': 1, 'numReadonlyUnsignedAccounts': 2}, 'accountKeys': ['EnJT2D1F5Bcpzufe5zH3krvweCgfrBmtR25WMZVDP4LZ', 'EbsUZEFAU23Z2SgAymFtU2hADLiyNLzaPLKiJfvpKnE7', 'DabqmiVPQu1gmFSaqCDHWPUoQwDXVj24jQWBaq4WyXfe', '3vpRyADnkjaWQhxEb6FZ82hmZ5igDAvcpiZqxFJVDMWm', 'SysvarRecentB1ockHashes11111111111111111111', '11111111111111111111111111111111'], 'recentBlockhash': '3HaC5STz1vxp6CFT1cZNMCpzvgVEkiJMmWRSovYrtSpW', 'instructions': [{'programIdIndex': 5, 'accounts': [2, 4, 1], 'data': '6vx8P', 'stackHeight': None}, {'programIdIndex': 5, 'accounts': [0, 3], 'data': '3Bxs4bmEVrPumJ7Z', 'stackHeight': None}]}}, 'meta': {'err': None, 'status': {'Ok': None}, 'fee': 10000, 'preBalances': [695700720, 4272328031, 1447680, 20000000, 42706560, 1], 'postBalances': [693351440, 4272328031, 1447680, 22339280, 42706560, 1], 'innerInstructions': [], 'logMessages': ['Program 11111111111111111111111111111111 invoke [1]', 'Program 11111111111111111111111111111111 success', 'Program 11111111111111111111111111111111 invoke [1]', 'Program 11111111111111111111111111111111 success'], 'preTokenBalances': [], 'postTokenBalances': [], 'rewards': [], 'loadedAddresses': {'writable': [], 'readonly': []}, 'computeUnitsConsumed': 0}, 'blockTime': 1703756029}, 'id': 0}
```

