UPDATE users
SET username = $1
WHERE user_id = $2
returning user_id, username;