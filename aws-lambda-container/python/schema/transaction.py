from pydantic import BaseModel, validator, ValidationError
from typing import Any, Union, Optional
from itertools import compress
import base58
from loguru import logger

class SolanaMessageHeader(BaseModel):
    numRequiredSignatures: int
    numReadonlySignedAccounts: int
    numReadonlyUnsignedAccounts: int

class SolanaInstruction(BaseModel):
    programIdIndex: int
    accounts: list[int]
    data: str

    @validator('data')
    def convert_to_base58(cls, v):
        return base58.b58decode(v).hex()

class SolanaAddressTableLookups(BaseModel):
    accountKey: str
    writeableIndexes: Optional[list[int]] = None
    readonlyIndexes: Optional[list[int]] = None

class SolanaAddressTableLookupsv2(BaseModel):
    accountKey: str
    writableIndexes: Optional[list[int]] = None
    readonlyIndexes: Optional[list[int]] = None

class SolanaTransactionMessage(BaseModel):
    header: SolanaMessageHeader
    accountKeys: list[str]
    recentBlockhash: str
    instructions: list[SolanaInstruction]
    addressTableLookups: Optional[Union[list[SolanaAddressTableLookups],list[SolanaAddressTableLookupsv2]]] = None

class SolanaLoadedAddresses(BaseModel):
    writable: list[str]
    readonly: list[str]

class SolanaUITokenAmount(BaseModel):
    uiAmount: Union[float, None]
    decimals: int
    amount: str
    uiAmountString: str

class SolanaTokenBalances(BaseModel):
    accountIndex: int
    mint: str
    uiTokenAmount: SolanaUITokenAmount
    owner: str
    programId: Optional[str] = None

class SolanaInnerInstruction(BaseModel):
    index: int
    instructions: list[SolanaInstruction]

class SolanaTransaction(BaseModel):
    signatures: list[str]
    message: SolanaTransactionMessage

class SolanaMetaStatus(BaseModel):
    Ok: Any

class SolanaTransactionMeta(BaseModel):
    err: Union[Any, None]
    status: dict
    fee: int
    preBalances: list[int]
    postBalances: list[int]
    innerInstructions: list[SolanaInnerInstruction]
    logMessages: list[str]
    preTokenBalances: list[SolanaTokenBalances]
    postTokenBalances: list[SolanaTokenBalances]
    rewards: list[Any]
    loadedAddresses: Union[list[SolanaLoadedAddresses], SolanaLoadedAddresses]

class SolanaTransactionResult(BaseModel):
    slot: int
    transaction: SolanaTransaction
    meta: SolanaTransactionMeta
    version: Union[int, str]
    blockTime: int

class SolanaTransactionBody(BaseModel):
    jsonrpc: str
    result: SolanaTransactionResult
    id: int

# if __name__ == "__main__":
#     print(SolanaTransactionBody.schema_json(indent=2))

def parse_object(result_json: dict):
    try:
        SolanaTransactionBody.model_validate(result_json)
        return result_json
    except ValidationError as exc:
        logger.info(repr(exc.errors()))
        #> 'arguments_type'