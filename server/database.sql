-- execute these to not make the queries fail
CREATE DATABASE pern;

\c pern;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

