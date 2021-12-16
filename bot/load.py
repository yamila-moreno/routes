import pathlib
import os
from subprocess import run
from xml.dom.minidom import parse


DB_NAME = os.getenv("PG_DB_NAME")
DB_USER = os.getenv("PG_USER")
DB_PASSWORD = os.getenv("PGPASSWORD")


def add_new_route(file_name, category, city, companion=None, trip=None):
    process_gpx(file_name, category, city, companion, trip)

    # TODO Move the original file to gpx/ directory

    # TODO Commit changes to the repository


def process_gpx(file_name, category, city, companion=None, trip=None):
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
        trip=trip
    )

    # 4. delete content in `tracks` table
    _truncate_tables()

    # 5. update `myroutes` with start_point and distance
    _update_extras()


def batch_load():
    directories = [
        ['../gpx/biking', 'biking', ''],
        ['../gpx/canada2019', 'hiking', 'Canadá 2019'],
        ['../gpx/eslovenia2016', 'hiking', 'Eslovenia 2016'],
        ['../gpx/hiking', 'hiking', ''],
        ['../gpx/lakedistrict2018', 'hiking', 'Lake District 2018'],
        ['../gpx/madeira2019', 'hiking', 'Madeira 2019'],
        ['../gpx/marruecos2017', 'hiking', 'Marruecos 2017'],
        ['../gpx/pirineo2021', 'hiking', 'Pirineros 2021'],
        ['../gpx/suiza2015', 'hiking', 'Suiza 2015'],
        ['../gpx/usa2011', 'hiking', 'USA 2011'],
        ['../gpx/usa2014', 'hiking', 'USA 2014'],
        ['../gpx/usa2018', 'hiking', 'USA 2018'],
        ['../gpx/vietnam2017', 'hiking', 'Vietnam 2017'],
        ['../gpx/walkingfestival2020', 'hiking', 'Walking Festival 2020']
    ]

    for col in directories:
        for gpx_file in sorted(pathlib.Path(col[0]).rglob('*.gpx')):
            if '_' in gpx_file.name:
                ogr_file = gpx_file.joinpath()
                print(ogr_file)
                process_gpx(
                    file_name=ogr_file,
                    category=col[1],
                    city='',
                    companion='',
                    trip=col[2]
                )


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
            -f PostgreSQL PG:"dbname='{DB_NAME}' host='localhost' port='5432' user='{DB_USER}' password='{DB_PASSWORD}'" \
            -nlt PROMOTE_TO_MULTI \
            {ogr_file}""",
        shell=True
    )


def _update_tracks(name, date, category, city='', trip='', companion=''):
    run(f"""psql -U {DB_USER} -h localhost {DB_NAME} -c "
        WITH collected_road as (
            SELECT ST_CollectionExtract(
                ST_Collect(
                    ARRAY (select wkb_geometry from tracks)
                ),
                2
            ) as whole_road
        )
        INSERT INTO myroutes(name, date, geom, category, trip, start_point, distance, city, companion)
        VALUES(
            '{name}',
            '{date}',
            (select whole_road from collected_road),
            '{category}',
            '{trip}',
            ST_SetSRID(ST_MakePoint(0, 0), 4326),
            0,
            '{city}',
            '{companion}'
        );
        "
    """, shell=True)


def _update_extras():
    run(f"""psql -U {DB_USER} -h localhost {DB_NAME} -c "
        WITH max_gid AS ( SELECT MAX(gid) AS max_gid FROM myroutes )
        UPDATE myroutes SET
            distance = TRUNC((ST_Length(geom)*100)::numeric, 2),
            start_point = ST_PointN(ST_GeometryN(geom, 1), 1)
        WHERE gid = (select max_gid from max_gid);
        "
    """, shell=True)


def _truncate_tables():
    run(f'psql -U {DB_USER} -h localhost {DB_NAME} -c "TRUNCATE tracks;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost {DB_NAME} -c "TRUNCATE track_points;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost {DB_NAME} -c "TRUNCATE routes;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost {DB_NAME} -c "TRUNCATE route_points;"', shell=True)
    run(f'psql -U {DB_USER} -h localhost {DB_NAME} -c "TRUNCATE waypoints;"', shell=True)


if __name__ == '__main__':
    batch_load()
