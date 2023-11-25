CREATE DATABASE perntodo;

-- Create a new 'todo' table with a 'completed' column.
CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  user_name VARCHAR(30),
  description VARCHAR(255),
  completed BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
