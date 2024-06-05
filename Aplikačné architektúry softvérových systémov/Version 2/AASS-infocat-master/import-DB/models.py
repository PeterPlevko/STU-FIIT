from enum import unique
from sqlalchemy import (TIMESTAMP, BigInteger, Boolean, Column, ForeignKey, Integer, MetaData, Numeric,
                        String, Table, Text)

metadata_obj = MetaData()
m_cats = Table('cats', metadata_obj,
               Column('id', Integer, primary_key=True),
               Column('name', String(150)),
               Column('country_origin', String(
                   100)),
               Column('country_current', String(
                   100)),
               Column('color', String(200)),
               Column('color_code', String(
                   70)),
               Column('date_of_birth', TIMESTAMP(
                   timezone=False)),
               Column('gender', String(
                   1)),
               Column('reg_num_original', String(
                   200)),
               Column('reg_num_current', String(
                   200)),
               Column('src_db', String(2048)),
               Column('src_id', Integer),
               Column('breed_id', Integer,
                      ForeignKey('breeds.id')),
               Column('created_at', TIMESTAMP(
                   timezone=True), default='now()'),
               Column('updated_at', TIMESTAMP(
                   timezone=True), default='now()'),
               )

m_cat_infos = Table('cat_informations', metadata_obj,
                    Column('id', Integer, primary_key=True),
                    Column('title_before', String(
                        200)),
                    Column('title_after', String(
                        200)),
                    Column('chip', String(
                        100)),
                    Column('verified_status', String(
                        20)),
                    Column('cattery', String(
                        100)),
                    Column('cat_id', Integer,
                           ForeignKey('cats.id')),
                    )

m_links = Table('links', metadata_obj,
                Column('id', Integer, primary_key=True),
                Column('content', String(
                    8000)),
                Column('type', String(
                    50)),
                Column('cat_id', Integer,
                       ForeignKey('cats.id')),
                Column('created_at', TIMESTAMP(
                    timezone=True), default='now()'),
                Column('updated_at', TIMESTAMP(
                    timezone=True), default='now()'),
                )

m_breeds = Table('breeds', metadata_obj,
                 Column('id', BigInteger, primary_key=True),
                 Column('code', String(7)),
                 )

m_references = Table('cat_references', metadata_obj,
                     Column('id', BigInteger, primary_key=True),
                     Column('cat_id', Integer,
                            ForeignKey('cats.id')),
                     Column('mother_id', Integer,
                            ForeignKey('cats.id')),
                     Column('father_id', Integer,
                            ForeignKey('cats.id')),
                     Column('mother_name', String(200)),
                     Column('father_name', String(200)),
                     Column('mother_reg_number', String(200)),
                     Column('father_reg_number', String(200)),
                     )
