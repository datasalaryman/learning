from solana.rpc.api import Client
from solders.signature import Signature
import json
import os

from dotenv import load_dotenv
from loguru import logger

load_dotenv()

RPC_ENDPOINT = os.environ.get("RPC_ENDPOINT")

http_client = Client(RPC_ENDPOINT)

def handler(event, context):
    event_message = json.loads(event["Records"][0]['Sns']["Message"])["payload"]
    tx_sig = Signature.from_string(event_message)
    tx = http_client.get_transaction(tx_sig)
    tx_json = json.loads(tx.to_json())
    logger.info(tx_json)
