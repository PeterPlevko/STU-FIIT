
from sqlalchemy import TIMESTAMP, BigInteger, Boolean, Numeric, Table, Column, Integer, String, MetaData, ForeignKey, Text, create_engine
from config import db_string
from models import metadata_obj

engine = create_engine(db_string)
metadata_obj.create_all(engine)

print("Tables created")
