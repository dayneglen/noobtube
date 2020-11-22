select v.video_id, u.user_id, u.username, u.picture_url, v.views, v.video_url, v.description from video v
join video_tag vt on vt.video_id = v.video_id
join users u on v.user_id = u.user_id
where tag_id in (
select tag_id from video_tag
where video_id = ${id}
);