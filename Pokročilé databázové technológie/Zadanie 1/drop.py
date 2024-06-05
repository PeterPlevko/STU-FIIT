from sqlalchemy import create_engine

from config import db_string
from models import metadata_obj

engine = create_engine(db_string)
with engine.connect() as conn:
    conn.execute("""DROP TABLE IF EXISTS public.annotations; 
    DROP TABLE IF EXISTS public.context_annotations;
    DROP TABLE IF EXISTS public.conversation_hashtags;
    DROP TABLE IF EXISTS public.conversation_references;
    DROP TABLE IF EXISTS public.links;
    DROP TABLE IF EXISTS public.context_entities;
    DROP TABLE IF EXISTS public.context_domains;
    DROP TABLE IF EXISTS public.conversations;
    DROP TABLE IF EXISTS public.authors;
    DROP TABLE IF EXISTS public.hashtags;
    """)

print("All tables dropped!")
