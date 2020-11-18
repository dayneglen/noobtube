select vt.tag_id, t.name from video_tag vt
join tag t on  t.tag_id = vt.tag_id
where video_id = ${id};