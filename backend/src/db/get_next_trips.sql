CREATE OR REPLACE FUNCTION get_next_trips(stop_id INT, from_time TIMESTAMP)
RETURNS TABLE(
  trip_id INT,
  route_name TEXT,
  arrival_time TIMESTAMP
) AS $$
SELECT
  ts.trip_id, r.name as route_name, ts.arrival_time
FROM trip_stop ts
JOIN trip t ON t.id = ts.trip_id
JOIN route r ON r.id = t.route_id
WHERE ts.stop_id = $1
  AND ts.arrival_time > $2
ORDER BY ts.arrival_time
LIMIT 5;
$$ LANGUAGE SQL;