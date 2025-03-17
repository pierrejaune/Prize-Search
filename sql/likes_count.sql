CREATE VIEW likes_count AS
SELECT product_id, COUNT(*) AS like_count
FROM likes
GROUP BY product_id;
