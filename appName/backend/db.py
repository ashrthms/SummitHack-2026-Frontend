import os
import sqlite3
import jwt
from jwt import (
    InvalidKeyError,
    InvalidTokenError,
    InvalidIssuedAtError,
)
import datetime
import bcrypt

DB_PATH = os.environ.get("DB_PATH", "/data/app.db")
TABLE_NAME = "users"
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"


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
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            region TEXT,
            password_hash TEXT,
            all_emis_saved INTEGER
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


def __create_token__(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def __decode_token__(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload  # contains user_id, exp, etc.


def get_user(token: str):
    user_id = __decode_token__(token)["user_id"]
    if not user_id:
        raise InvalidTokenError("Invalid token")
    return __get_user_by_id__(user_id)


def __get_user_by_id__(user_id):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT user_id, name, email, region, all_emis_saved FROM users WHERE user_id = ?",
        (user_id,),
    )

    row = cur.fetchone()
    conn.close()

    if row is None:
        raise InvalidKeyError("There is no user with that user id")

    return dict(row)


def update_emmisions(email, to_add):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET all_emis_saved = all_emis_saved + ? WHERE email = ?",
        (
            to_add,
            email,
        ),
    )
    conn.commit()
    conn.close()


def get_all_users():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users")

    rows = cur.fetchall()

    conn.close()

    return [dict(row) for row in rows]


def login_user(email, password):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT user_id, password_hash FROM users WHERE email = ?", (email,))

    user = cur.fetchone()
    conn.close()

    if user is None:
        raise InvalidTokenError("There is no account under that email address")

    stored_hash = user["password_hash"].encode("utf-8")
    password_bytes = password.encode("utf-8")

    if not bcrypt.checkpw(password_bytes, stored_hash):
        raise InvalidKeyError("Incorrect password")

    return __create_token__(user["user_id"])


def add_user(name: str, email: str, password: str, region: str):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("SELECT user_id FROM users WHERE email = ?", (email,))
    existing = cur.fetchone()

    if existing:
        conn.close()
        raise InvalidIssuedAtError(
            "There is already an account using that email address"
        )

    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )

    cur.execute(
        """
        INSERT INTO users (name, email, region, password_hash, all_emis_saved)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            name,
            email,
            region,
            password_hash,
            0,
        ),
    )

    conn.commit()
    user_id = cur.lastrowid
    conn.close()

    return {
        "token": __create_token__(user_id),
    }
