CREATE DATABASE foodfy;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url TEXT
);

CREATE TABLE IF NOT EXISTS recipes (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  prep_time INT NOT NULL,
  servings INT NOT NULL,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  user_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  expires_in TIMESTAMP NOT NULL,
  user_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS revoked_tokens (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  token TEXT NOT NULL,
  revoked_at TIMESTAMP DEFAULT NOW()
);
