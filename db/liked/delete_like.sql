DELETE FROM subscription
WHERE user_id = $1 AND video_id = $2;