SELECT * FROM liked_video
WHERE user_id = $1 AND video_id = $2;