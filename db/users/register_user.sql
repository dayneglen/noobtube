INSERT INTO users (
    username,
    email,
    password,
    is_admin
)VALUES (
    ${username},
    ${email},
    ${hash},
    FALSE
)
returning user_id, username, email, is_admin;