INSERT INTO video (
    user_id,
    title,
    description,
    video_url,
    views,
    video_reported
) VALUES (
    ${userId},
    ${title},
    ${description},
    ${video_url},
    views = 0,
    video_reported = 0
);