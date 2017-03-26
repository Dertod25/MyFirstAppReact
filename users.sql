DROP DATABASE IF EXISTS dbuserslist;
CREATE DATABASE dbuserslist;

\c dbuserslist;

CREATE TABLE listusers (
  ID SERIAL PRIMARY KEY,
  login VARCHAR,
  password VARCHAR,
  email VARCHAR,
  firstname VARCHAR,
  lastname VARCHAR
);

INSERT INTO listusers (login, password, email, firstname, lastname)
  VALUES ('Dertod', '12345', 'isolevent@gmail.com', 'Yaroslav','Gavrylenko');

