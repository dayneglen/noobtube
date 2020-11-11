DELETE FROM subscription
WHERE subscriber = $1 AND creator = $2;