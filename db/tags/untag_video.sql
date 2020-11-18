delete from video_tag
where video_id = ${id} and tag_id = ${tag_id};

select vt.tag_id, t.name from tag t
join video_tag vt on vt.tag_id = t.tag_id
where video_id = ${id};