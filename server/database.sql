CREATE DATABASE perntodo;

-- Create a new 'todo' table with a 'completed' column.
CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  completed BOOLEAN DEFAULT false
);
