require('dotenv').config();
const client = require('../db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    linkedin VARCHAR(128),
    github_profile VARCHAR(128),
    classwork_repo VARCHAR(128)
  );

  CREATE TABLE IF NOT EXISTS tables (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL
  );

  
  CREATE TABLE IF NOT EXISTS humor (
    id SERIAL PRIMARY KEY,
    url VARCHAR(512) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS advice (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(256) NOT NULL,
    text VARCHAR(1024) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS resource_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(64) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id),
    category_id INTEGER NOT NULL REFERENCES resource_categories(id),
    title VARCHAR(256) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    url VARCHAR(256) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS workspaces (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(256) NOT NULL,
    workspace_type VARCHAR(256) NOT NULL,
    address VARCHAR(256) NOT NULL,
    description VARCHAR(1024),
    url VARCHAR(256)
  );

  CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    table_id INTEGER NOT NULL REFERENCES tables(id),
    post_id INTEGER NOT NULL 
  );
  
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL,
    author_id INTEGER NOT NULL REFERENCES users(id),
    table_id INTEGER NOT NULL REFERENCES tables(id),
    post_id INTEGER NOT NULL,
    text VARCHAR(512) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS saved (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    table_id INTEGER NOT NULL REFERENCES tables(id),
    post_id INTEGER NOT NULL
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });