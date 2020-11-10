SELECT v.video_id, u.user_id, u.username, v.views, v.video_url, v.description FROM video v
JOIN users u ON v.user_id = u.user_id
WHERE video_id = $1;