UPDATE users
SET picture_url = $1
WHERE user_id = $2;