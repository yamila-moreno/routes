import csv
import json
import logging
import pathlib
import os
import sys
from subprocess import run, DEVNULL, STDOUT
from xml.dom.minidom import parse


logging.basicConfig(
    format='%(levelname)s - %(message)s', level=logging.INFO
)

logger = logging.getLogger(__name__)

DB_NAME = os.getenv("PG_DB_NAME")
DB_USER = os.getenv("PG_USER")
DB_PORT = os.getenv("PG_HOST_PORT")
DB_PASSWORD = os.getenv("PGPASSWORD")
GPX_FILE = 'routes.json'


def add_new_route(route_id: str) -> None:
    with open(GPX_FILE, mode='r') as routes_metadata:
        data = json.load(routes_metadata)
        route = data[route_id]
        _process_gpx(
            file_name=f"../gpx/{route['file_name']}",
            category=route['cat'],
            city=route.get('city'),
            trip=route.get('trip'),
            participants=route.get('participants', 'Tontako Team'),
            photos=route.get('photos'),
            post=route.get('post')
        )
        logger.info(f"Uploaded {route_id}")



def batch_load() -> None:
    # delete data
    _run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE myroutes RESTART IDENTITY;"')

    # load new data
    with open(GPX_FILE, mode='r') as routes_metadata:
        data = json.load(routes_metadata)
        total_routes = len(data)
        for route_id, route in data.items():
            _process_gpx(
                file_name=f"../gpx/{route['file_name']}",
                category=route['cat'],
                city=route.get('city'),
                trip=route.get('trip'),
                participants=route.get('participants', 'Tontako Team'),
                photos=route.get('photos'),
                post=route.get('post')
            )
            logger.info(f"Uploaded {route_id}")

    logger.info(f"Uploaded {total_routes} routes")


def _process_gpx(
    file_name: str,
    category: str,
    city: str = '',
    trip: str = '',
    participants: str = '',
    photos: str = '',
    post: str = ''
) -> None:
    # 1. load gpx in `tracks` table
    _load_gpx(file_name)

    # 2. extract some metadata from gpx
    xml_info = parse(str(file_name))
    name = _get_name(xml_info)
    date = _get_date(xml_info)

    # 3. copy data from `tracks` (wkb_geometry) to `myroutes` with the rest of the metadata
    _update_tracks(
        name=name,
        date=date,
        category=category,
        city=city,
        trip=trip,
        participants=participants,
        photos=photos,
        post=post
    )

    # 4. delete content in `tracks` table
    _truncate_tables()

    # 5. update `myroutes` with start_point and distance
    _update_extras()


def _get_name(xml_info):
        try:
            metadata = xml_info.firstChild.getElementsByTagName("metadata")[0]
            name = metadata.getElementsByTagName("name")[0].firstChild.nodeValue
            return name
        except:
            for trk in xml_info.getElementsByTagName("trk"):
                try:
                    name = trk.getElementsByTagName("name")[0].firstChild.nodeValue
                    return name
                except:
                    pass


def _get_date(xml_info):
        try:
            metadata = xml_info.firstChild.getElementsByTagName("metadata")[0]
            date = metadata.getElementsByTagName("time")[0].firstChild.nodeValue
            return date
        except:
            for trk in xml_info.getElementsByTagName("trk"):
                try:
                    date = trk.getElementsByTagName("trkseg")[0].getElementsByTagName("trkpt")[0].getElementsByTagName("time")[0].firstChild.nodeValue
                    return date
                except:
                    pass


def _load_gpx(ogr_file):
    _run(f"""ogr2ogr \
            -update \
            -append \
            -f PostgreSQL PG:"dbname='{DB_NAME}' host='localhost' port='{DB_PORT}' user='{DB_USER}' password='{DB_PASSWORD}'" \
            -nlt PROMOTE_TO_MULTI \
            {ogr_file}
   """)


def _update_tracks(name, date, category, city='', trip='', participants='Tontako Team', photos='', post=''):
    _run(f"""psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "
        WITH collected_road as (
            SELECT ST_CollectionExtract(
                ST_Collect(
                    ARRAY (select wkb_geometry from tracks)
                ),
                2
            ) as whole_road
        )
        INSERT INTO myroutes(
            name, date, geom, category, trip, start_point, distance, city, participants, photos, post
        )
        VALUES(
            '{name}',
            '{date}',
            (select whole_road from collected_road),
            '{category}',
            '{trip}',
            ST_SetSRID(ST_MakePoint(0, 0), 4326),
            0,
            '{city}',
            '{participants}',
            '{photos}',
            '{post}'
        );
        "
    """)


def _update_extras():
    _run(f"""psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "
        WITH max_gid AS ( SELECT MAX(gid) AS max_gid FROM myroutes )
        UPDATE myroutes SET
            distance = TRUNC((ST_Length(geom)*100)::numeric, 2),
            start_point = ST_PointN(ST_GeometryN(geom, 1), 1)
        WHERE gid = (select max_gid from max_gid);
        "
    """)


def _truncate_tables():
    _run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE tracks;"')
    _run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE track_points;"')
    _run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE routes;"')
    _run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE route_points;"')
    _run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE waypoints;"')


def _run(sql_command: str) -> None:
    run(sql_command, shell=True, stdout=DEVNULL, stderr=STDOUT)


if __name__ == '__main__':
    args = sys.argv
    if args[1] == 'single':
        add_new_route(args[2])
    elif args[1] == 'batch':
        batch_load()
    else:
        print("Argument error")
