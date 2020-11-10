UPDATE video
SET title = ${title},
    description = ${description}
WHERE video_id = ${videoId};