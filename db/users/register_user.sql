INSERT INTO users (
    username,
    email,
    password,
    is_admin,
    picture_url
)VALUES (
    ${username},
    ${email},
    ${hash},
    FALSE,
    ('https://le-bucket.s3-us-west-1.amazonaws.com/blank-profile-picture-973460_1280-e1561474127956-1033x1033.png')
)
returning user_id, username, email, is_admin;