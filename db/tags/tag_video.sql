insert into video_tag (video_id, tag_id)
values (${id}, ${tag_id});

select vt.tag_id, t.name from tag t
join video_tag vt on vt.tag_id = t.tag_id
where vt.video_id = ${id};