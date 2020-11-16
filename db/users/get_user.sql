SELECT email, is_admin, picture_url, user_id, username FROM users
WHERE user_id = $1;