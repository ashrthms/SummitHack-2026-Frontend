import sqlite3
import os

DB_PATH = os.environ.get("DB_PATH", "/data/app.db")
TABLE_NAME = "users"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
            latitude REAL,
            longitude REAL
        )
    """
    )
    conn.commit()
    conn.close()


def table_exists():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name=?
    """,
        (TABLE_NAME,),
    )

    exists = cur.fetchone() is not None
    conn.close()
    return exists
