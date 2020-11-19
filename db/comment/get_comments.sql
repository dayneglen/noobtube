SELECT u.username, u.picture_url, c.comment, c.comment_id FROM comment c
JOIN users u ON c.user_id = u.user_id
WHERE video_id = $1
ORDER BY video_id ASC;
