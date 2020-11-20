SELECT v.video_id, v.user_id, v.title, v.description, v.video_url, v.views, u.username, u.picture_url, v.video_reported FROM video v
JOIN users u ON v.user_id = u.user_id
ORDER BY video_id ASC;