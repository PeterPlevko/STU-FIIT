from enum import unique
from sqlalchemy import (TIMESTAMP, BigInteger, Boolean, Column, ForeignKey, Integer, MetaData, Numeric,
                        String, Table, Text)

metadata_obj = MetaData()
m_context_annotations = Table('context_annotations', metadata_obj,
                              Column('id', BigInteger, primary_key=True),
                              Column('conversation_id',
                                     BigInteger, nullable=False),
                              Column('context_domain_id', BigInteger,
                                     nullable=False),
                              Column('context_entity_id', BigInteger,
                                     nullable=False),
                              )

m_conversation_references = Table('conversation_references', metadata_obj,
                                  Column('id', BigInteger, primary_key=True),
                                  Column('conversation_id',
                                         BigInteger, nullable=False),
                                  Column('parent_id', BigInteger,
                                         nullable=False),
                                  Column('type', String(20), nullable=False),
                                  )

m_conversation_hashtags = Table('conversation_hashtags', metadata_obj,
                                Column('id', BigInteger, primary_key=True),
                                Column('conversation_id',
                                       BigInteger, nullable=False),
                                Column('hashtag_id', BigInteger,
                                       nullable=False),
                                )

m_authors = Table('authors', metadata_obj,
                  Column('id', BigInteger, primary_key=True),
                  Column('username', String(255)),
                  Column('name', String(255)),
                  Column('description', Text),
                  Column('followers_count', Integer),
                  Column('following_count', Integer),
                  Column('listed_count', Integer),
                  Column('tweet_count', Integer),
                  )

m_conversations = Table('conversations', metadata_obj,
                        Column('id', BigInteger, primary_key=True),
                        Column('language', String(3), nullable=False),
                        Column('content', Text, nullable=False),
                        Column('source', Text, nullable=False),
                        Column('retweet_count', Integer),
                        Column('reply_count', Integer),
                        Column('like_count', Integer),
                        Column('quote_count', Integer),
                        Column('possibly_sensitive', Boolean, nullable=False),
                        Column('created_at', TIMESTAMP(
                            timezone=True), nullable=False),
                        Column('author_id', BigInteger, nullable=False),
                        )

m_hashtags = Table('hashtags', metadata_obj,
                   Column('id', BigInteger, primary_key=True),
                   Column('tag', Text, unique=True, nullable=False),
                   )

m_context_domains = Table('context_domains', metadata_obj,
                          Column('id', BigInteger, primary_key=True),
                          Column('name', String(255), nullable=False),
                          Column('description', Text)
                          )

m_context_entities = Table('context_entities', metadata_obj,
                           Column('id', BigInteger, primary_key=True),
                           Column('name', String(255), nullable=False),
                           Column('description', Text)
                           )

m_annotations = Table('annotations', metadata_obj,
                      Column('id', BigInteger, primary_key=True),
                      Column('value', Text, nullable=False),
                      Column('type', Text, nullable=False),
                      Column('probability', Numeric(4, 3), nullable=False),
                      Column('conversation_id', BigInteger, nullable=False)
                      )

m_links = Table('links', metadata_obj,
                Column('id', BigInteger, primary_key=True),
                Column('title', Text),
                Column('description', Text),
                Column('url', String(2048), nullable=False),
                Column('conversation_id', BigInteger,  nullable=False),
                )
