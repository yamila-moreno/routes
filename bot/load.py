import csv
import logging
import pathlib
import os
from subprocess import run
from xml.dom.minidom import parse


logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)

logger = logging.getLogger(__name__)

DB_NAME = os.getenv("PG_DB_NAME")
DB_USER = os.getenv("PG_USER")
DB_PORT = os.getenv("PG_HOST_PORT")
DB_PASSWORD = os.getenv("PGPASSWORD")
CSV_FILE = 'min_data.csv'


def add_new_route(file_name, directory, category, city='', companion='', trip='', hikers='Tontako Team'):
    route_name = _process_gpx(
        file_name=file_name,
        category=category,
        city=city,
        companion=companion,
        trip=trip,
        hikers=hikers,
        photos='',
        post=''
    )

    # Move the original file to gpx/ directory
    destination_path = f"../gpx/{directory}/{file_name}"
    os.rename(file_name, destination_path)

    # Add the new data to routes_metadata.csv for batch loading
    with open(CSV_FILE, mode='a+') as routes_metadata:
        fieldnames = ['file_name', 'category', 'trip', 'companion', 'city', 'hikers', 'photos', 'post']
        writer = csv.DictWriter(routes_metadata, fieldnames=fieldnames, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow({
            'file_name': destination_path,
            'category': category,
            'trip': trip,
            'companion': companion,
            'city': city,
            'hikers': hikers,
            'photos': '',
            'post': ''
        })

    # Commit changes to the repository (both metadata and the gpx)
    run(f'git add routes_metadata.csv {destination_path} && git commit -m "Subida ruta {route_name}" && git push', shell=True)


def batch_load():
    with open(CSV_FILE, mode='r') as routes_metadata:
        reader = csv.DictReader(routes_metadata, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for route in reader:
            logger.info(f"Uploaded {route['file_name']}")
            _process_gpx(
                file_name=route['file_name'],
                category=route['category'],
                city=route.get('city'),
                trip=route.get('trip'),
                hikers=route['hikers'] or 'Tontako Team',
                companion=route.get('companion'),
                photos=route.get('photos'),
                post=route.get('post')
            )


def _process_gpx(file_name, category, city='', companion='', trip='', hikers='', photos='', post=''):
    # 1. load gpx in `tracks` table
    _load_gpx(file_name)

    # 2. extract some metadata from gpx
    xml_info = parse(str(file_name))
    metadata = xml_info.firstChild.getElementsByTagName("metadata")[0]
    name = _get_name(metadata, xml_info)
    date = _get_date(metadata, xml_info)

    # 3. copy data from `tracks` (wkb_geometry) to `myroutes` with the rest of the metadata
    _update_tracks(
        name=name,
        date=date,
        category=category,
        city=city,
        companion=companion,
        trip=trip,
        hikers=hikers,
        photos=photos,
        post=post
    )

    # 4. delete content in `tracks` table
    _truncate_tables()

    # 5. update `myroutes` with start_point and distance
    _update_extras()

    return name


def _get_name(metadata, xml_info):
        try:
            name = metadata.getElementsByTagName("name")[0].firstChild.nodeValue
            return name
        except:
            for trk in xml_info.getElementsByTagName("trk"):
                try:
                    name = trk.getElementsByTagName("name")[0].firstChild.nodeValue
                    return name
                except:
                    pass


def _get_date(metadata, xml_info):
        try:
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
    run(f"""ogr2ogr \
            -update \
            -append \
            -f PostgreSQL PG:"dbname='{DB_NAME}' host='localhost' port='{DB_PORT}' user='{DB_USER}' password='{DB_PASSWORD}'" \
            -nlt PROMOTE_TO_MULTI \
            {ogr_file}""",
        shell=True
    )


def _update_tracks(name, date, category, city='', trip='', companion='', hikers='Tontako Team', photos='', post=''):
    run(f"""psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "
        WITH collected_road as (
            SELECT ST_CollectionExtract(
                ST_Collect(
                    ARRAY (select wkb_geometry from tracks)
                ),
                2
            ) as whole_road
        )
        INSERT INTO myroutes(
            name, date, geom, category, trip, start_point, distance, city, companion, hikers, photos, post
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
            '{companion}',
            '{hikers}',
            '{photos}',
            '{post}'
        );
        "
    """, shell=True)


def _update_extras():
    run(f"""psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "
        WITH max_gid AS ( SELECT MAX(gid) AS max_gid FROM myroutes )
        UPDATE myroutes SET
            distance = TRUNC((ST_Length(geom)*100)::numeric, 2),
            start_point = ST_PointN(ST_GeometryN(geom, 1), 1)
        WHERE gid = (select max_gid from max_gid);
        "
    """, shell=True)


def _truncate_tables():
    run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE tracks;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE track_points;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE routes;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE route_points;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost -p {DB_PORT} {DB_NAME} -c "TRUNCATE waypoints;"', shell=True)


if __name__ == '__main__':
    batch_load()
