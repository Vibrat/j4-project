import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base

class SQLORM:

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, 'instance'):
            cls.instance = super(SQLORM, cls).__new__(cls)
        return cls.instance

    def __init__(self, database_url):
        self.database_url = database_url
        self.engine = create_engine(
                database_url, connect_args={}
        )
        self.session_maker = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.base = declarative_base()

    def get_session(self):
        return self.session_maker()


# keep track a one instance for convenience
master = SQLORM(
    database_url=os.getenv("DB_CONNECTION")
)

def set_master(conn: SQLORM):
    global master
    master = conn

def get_session():
    return master.get_session()