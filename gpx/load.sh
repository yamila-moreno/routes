# 1. cargar el gpx en la tabla tracks
ogr2ogr \
    -update \
    -append \
    -f PostgreSQL PG:"dbname='api' host='localhost' port='5432' user='routes' password='routes'" \
    -nlt PROMOTE_TO_MULTI \
    $1

# 2. añadir una row a la tabla myroutes partiendo de los datos del formulario
# y del wkb_geometry de la tabla tracks
PGPASSWORD=routes psql -U routes -h localhost api -c "
    WITH collected_road as (
        SELECT ST_CollectionExtract(
            ST_Collect(
                ARRAY (select wkb_geometry from tracks)
            ),
            2
        ) as whole_road
    )
    INSERT INTO myroutes(name, date, geom)
    VALUES('$2', '$3', (select whole_road from collected_road));
"

# PGPASSWORD=routes psql -U routes -h localhost api -c "SELECT ST_AsGeoJSON(wkb_geometry) from tracks order by gid desc limit 1;"

# 3. borrar el contenido de las tablas de carga
PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE tracks;"
PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE track_points;"
PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE routes;"
PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE route_points;"
PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE waypoints;"
