UPDATE users
SET picture_url = null
WHERE user_id = $1;
