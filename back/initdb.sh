psql -U ${PG_USER} -h localhost -p ${PG_HOST_PORT} ${PG_DB_NAME} -c "
CREATE TABLE public.myroutes (
    gid serial primary key,
    name varchar,
    geom geometry(MultiLineString, 4326),
    start_point geometry(Point, 4326),
    distance float,
    date date,
    participants varchar DEFAULT 'Tontako Team',
    city varchar null,
    photos varchar null,
    post varchar null,
    trip varchar null,
    category varchar null
);

CREATE ROLE ${PGRST_DB_ANON_ROLE} NOLOGIN;
GRANT SELECT ON public.myroutes TO ${PGRST_DB_ANON_ROLE};

CREATE OR REPLACE FUNCTION public.get_routes(minx float, miny float, maxx float, maxy float)
RETURNS TABLE(
    name text,
    geom json,
    start_point json,
    distance float,
    date varchar,
    participants varchar,
    city varchar,
    photos varchar,
    post varchar,
    trip varchar,
    category varchar
)
AS \$\$

  SELECT name, ST_AsGeoJSON(geom)::json, ST_AsGeoJSON(start_point)::json, distance,
         to_char(date, 'DD-MM-YYYY'), participants, city, photos, post, trip, category
  FROM   public.myroutes
  WHERE  geom && ST_MakeEnvelope (minx, miny, maxx, maxy, 4326)

\$\$ LANGUAGE SQL;
"
docker-compose kill -s SIGUSR1 server
