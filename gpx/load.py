import pathlib
from subprocess import run
from xml.dom.minidom import parse


def batch_load():
    directories = [
        ['biking', 'biking', ''],
        ['canada2019', 'hiking', 'Canadá 2019'],
        ['eslovenia2016', 'hiking', 'Eslovenia 2016'],
        ['hiking', 'hiking', ''],
        ['lakedistrict2018', 'hiking', 'Lake District 2018'],
        ['madeira2019', 'hiking', 'Madeira 2019'],
        ['marruecos2017', 'hiking', 'Marruecos 2017'],
        ['pirineo2021', 'hiking', 'Pirineros 2021'],
        ['suiza2015', 'hiking', 'Suiza 2015'],
        ['usa2011', 'hiking', 'USA 2011'],
        ['usa2014', 'hiking', 'USA 2014'],
        ['usa2018', 'hiking', 'USA 2018'],
        ['vietnam2017', 'hiking', 'Vietnam 2017'],
        ['walkingfestival2020', 'hiking', 'Walking Festival 2020']
    ]

    for col in directories:
        for gpx_file in sorted(pathlib.Path(col[0]).rglob('*.gpx')):
            if '_' in gpx_file.name:
                ogr_file = gpx_file.joinpath()
                print(ogr_file)

                # 1. cargar el gpx en la tabla tracks
                _load_gpx(ogr_file)

                xml_info = parse(str(ogr_file))
                metadata = xml_info.firstChild.getElementsByTagName("metadata")[0]
                name = _get_name(metadata, xml_info)
                date = _get_date(metadata, xml_info)
                # 2. añadir una row a la tabla myroutes partiendo de los datos del formulario
                # y del wkb_geometry de la tabla tracks
                _update_tracks(name=name, date=date, category=col[1], trip=col[2])

                # 3. borrar el contenido de las tablas de carga
                _truncate_tables()

        # 4. Actualizar la tabla myroutes para que coja el start_point y calcule la distancia
    _update_extras()



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
            -f PostgreSQL PG:"dbname='api' host='localhost' port='5432' user='routes' password='routes'" \
            -nlt PROMOTE_TO_MULTI \
            {ogr_file}""",
        shell=True
    )


def _update_tracks(name, date, category='', trip=''):
    run(f"""PGPASSWORD=routes psql -U routes -h localhost api -c "
        WITH collected_road as (
            SELECT ST_CollectionExtract(
                ST_Collect(
                    ARRAY (select wkb_geometry from tracks)
                ),
                2
            ) as whole_road
        )
        INSERT INTO myroutes(name, date, geom, category, trip, start_point, distance)
        VALUES(
            '{name}',
            '{date}',
            (select whole_road from collected_road),
            '{category}',
            '{trip}',
            ST_SetSRID(ST_MakePoint(0, 0), 4326),
            0
        );
        "
    """, shell=True)


def _update_extras():
    run(f"""PGPASSWORD=routes psql -U routes -h localhost api -c "
        UPDATE myroutes set distance = ST_Length(geom)*100;
        UPDATE myroutes set distance = trunc(distance::numeric, 2);
        UPDATE myroutes set start_point = ST_PointN(ST_GeometryN(geom, 1), 1);
        "
    """, shell=True)


def _truncate_tables():
    run('PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE tracks;"', shell=True)
    run('PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE track_points;"', shell=True)
    run('PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE routes;"', shell=True)
    run('PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE route_points;"', shell=True)
    run('PGPASSWORD=routes psql -U routes -h localhost api -c "TRUNCATE waypoints;"', shell=True)


if __name__ == '__main__':
    batch_load()
