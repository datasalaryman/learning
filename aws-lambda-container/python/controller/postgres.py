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

metadata_obj = MetaData(schema="solana")

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

    tx_signature = data["data"]["result"]["transaction"]["signatures"][0]

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

        logger.info(f'{data["data"]["result"]["transaction"]["signatures"][0]} processed')

def transaction_list_check(conn, table:Table):

    check_stmt = select(table.c.transaction)

    check_result = conn.execute(check_stmt).scalars().all()

    return check_result

def get_ingested_list():
    engine = create_engine(
        f"postgresql+psycopg2://{WAREHOUSE_USER}:{WAREHOUSE_PASSWORD}@{WAREHOUSE_HOSTNAME}/{WAREHOUSE_DATABASE}"
    )

    metadata_obj.create_all(engine, checkfirst=True)

    logger.info("Getting transactions from database")

    with engine.connect() as conn:
        transaction_list = transaction_list_check(conn=conn, table=solana_raw)
        conn.close()

    logger.info("Done.")

    return transaction_list


class PostgresIOManager(IOManager):

    def load_input(self, context) -> None:
        pass

    def handle_output(self, context, obj):
        engine = create_engine(
            f"postgresql+psycopg2://{WAREHOUSE_USER}:{WAREHOUSE_PASSWORD}@{WAREHOUSE_HOSTNAME}/{WAREHOUSE_DATABASE}"
        )

        metadata_obj.create_all(engine, checkfirst=True)

        logger.info("Connected to database")

        if obj:

            success_data_list = [
                item
                for item in obj if item["status"] == "success"
            ]

            failure_data_list = [
                item
                for item in obj if item["status"] == "failure"
            ]

            with engine.connect() as conn:
                for item in success_data_list:
                    transaction_insert(conn=conn, table=solana_raw, data=item)
                for item in failure_data_list:
                    transaction_insert(conn=conn, table=solana_errors, data=item)
                conn.close()

        else:
            logger.info("Transactions already processed")

@io_manager
def postgres_controller():
    return PostgresIOManager()
