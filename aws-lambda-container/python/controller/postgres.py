import os
from datetime import datetime

from sqlalchemy import create_engine, MetaData, Table, Column, String, DateTime, insert, select
from sqlalchemy.types import JSON
from loguru import logger
from dotenv import load_dotenv


load_dotenv()

# Load Python API endpoint
WAREHOUSE_USER = os.environ.get("WAREHOUSE_USER")
WAREHOUSE_PASSWORD = os.environ.get("WAREHOUSE_PASSWORD")
WAREHOUSE_HOSTNAME = os.environ.get("WAREHOUSE_HOSTNAME")
WAREHOUSE_DATABASE = os.environ.get("WAREHOUSE_DATABASE")
WAREHOUSE_SCHEMA = os.environ.get("WAREHOUSE_SCHEMA")

metadata_obj = MetaData(schema=WAREHOUSE_SCHEMA)

solana_raw = Table(
    "raw",
    metadata_obj,
    Column("transaction", String, primary_key=True),
    Column("ingest_timestamp", DateTime, primary_key=True),
    Column("data", JSON),
    Column("version", String(11))
)

solana_errors = Table(
    "errors",
    metadata_obj,
    Column("transaction", String, primary_key=True),
    Column("ingest_timestamp", DateTime, primary_key=True),
    Column("data", JSON),
    Column("version", String(11))
)

def transaction_insert(conn, table:Table, data:dict):

    # logger.info(f'{data["data"]} with type {type(data["data"])}')

    tx_signature = data["result"]["transaction"]["signatures"][0]

    # check if transaction is in table
    check_stmt = select(table).where(table.c.transaction == tx_signature)

    check_result = conn.execute(check_stmt).all()

    # if transaction not in table, create statement and execute
    if not check_result:
        insert_stmt = insert(table).values(
            transaction = tx_signature,
            ingest_timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
            data = data,
            version = "0.0.0"
        )
        insert_result = conn.execute(insert_stmt)

        insert_result.close()

        logger.info(f'{data["result"]["transaction"]["signatures"][0]} processed')


def lambda_handle_output(obj):
    engine = create_engine(
        f"postgresql+psycopg2://{WAREHOUSE_USER}:{WAREHOUSE_PASSWORD}@{WAREHOUSE_HOSTNAME}/{WAREHOUSE_DATABASE}"
    )
    metadata_obj.create_all(engine, checkfirst=True)

    with engine.connect() as conn:
        logger.info("Connected to database")
        transaction_insert(conn=conn, table=solana_raw, data=obj)
        logger.info("Transaction ingested")
