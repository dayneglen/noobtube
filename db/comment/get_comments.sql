<<<<<<< HEAD
SELECT u.username, u.picture_url, comment, comment_id FROM comment c
=======
SELECT u.username, u.picture_url, c.comment_id, c.comment FROM comment c
>>>>>>> main
JOIN users u ON c.user_id = u.user_id
WHERE video_id = $1
ORDER BY video_id ASC;
