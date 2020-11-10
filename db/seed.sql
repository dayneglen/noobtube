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
    user_id INTEGER REFERENCES users(user_id),
    title VARCHAR(100),
    description TEXT,
    video_url VARCHAR(255),
    views INTEGER,
    video_reported INTEGER
);