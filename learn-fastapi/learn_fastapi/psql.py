from sqlalchemy import create_engine

class Database:
    def __init__(self):
        self.engine = create_engine('postgresql+psycopg2://user@localhost/postgres')
        return self

    def create(self, table, data):
        return "table and data"

    def read(self, table):
        return "data"

    def update(self, table, data):
        return "table and data"

    def delete(self, table):
        return "table"