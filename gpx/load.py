import pathlib
from subprocess import run
from xml.dom.minidom import parse

for gpx_file in sorted(pathlib.Path('.').rglob('*.gpx')):
    if '_' in gpx_file.name:
        ogr_file = gpx_file.joinpath()
        print(ogr_file)

        xml_info = parse(str(ogr_file))
        metadata = xml_info.firstChild.getElementsByTagName("metadata")[0]

        try:
            name = metadata.getElementsByTagName("name")[0].firstChild.nodeValue
        except:
            for trk in xml_info.getElementsByTagName("trk"):
                try:
                    name = trk.getElementsByTagName("name")[0].firstChild.nodeValue
                    break
                except:
                    pass

        try:
            date = metadata.getElementsByTagName("time")[0].firstChild.nodeValue
        except:
            for trk in xml_info.getElementsByTagName("trk"):
                try:
                    date = trk.getElementsByTagName("trkseg")[0].getElementsByTagName("trkpt")[0].getElementsByTagName("time")[0].firstChild.nodeValue
                    break
                except:
                    pass

        run(["sh", "load.sh", ogr_file, name, date])
