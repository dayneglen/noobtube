CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    picture_url VARCHAR(255),
    is_admin BOOLEAN default false
);

CREATE TABLE subscription (
    subscription_id SERIAL PRIMARY KEY,
    subscriber INTEGER REFERENCES users(user_id),
    creator INTEGER REFERENCES users(user_id)
);

CREATE TABLE video (
    video_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(100),
    description TEXT,
    video_url VARCHAR(255),
    views INTEGER,
    video_reported INTEGER
);

CREATE TABLE liked_video (
    liked_video_id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES video(video_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    liked BOOLEAN
);

CREATE TABLE disliked_video (
    disliked_video_id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES video(video_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    disliked BOOLEAN
);

CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE video_tag (
    video_tag_id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES video(video_id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tag(tag_id) ON DELETE CASCADE
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES video(video_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    comment VARCHAR(500)
);