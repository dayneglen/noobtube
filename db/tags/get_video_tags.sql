select vt.tag_id, t.name from video_tag vt
join tag t on  vt.tag_id = t.tag_id
where video_id = ${id};