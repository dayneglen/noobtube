UPDATE video
SET views = views + 1
WHERE video_id = $1;