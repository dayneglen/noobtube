SELECT * FROM disliked_video
WHERE user_id = $1 AND video_id = $2;