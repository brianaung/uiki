-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
-- CREATE TABLE "user" (
--   id uuid PRIMARY KEY,
--   username VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL
-- );
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- DROP TABLE "user";
-- +goose StatementEnd
