-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
CREATE TABLE page (
  id uuid PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  body TEXT NOT NULL,
  userId uuid,
  CONSTRAINT fk_user
    FOREIGN KEY(userId)
      REFERENCES "user"(id)
  -- created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
DROP TABLE page;
-- +goose StatementEnd
