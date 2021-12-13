curl "http://localhost:3000/rpc/get_routes?select=name" \
  -X POST -H "Content-Type: application/json" \
  -d '{ "minx": -7.093048095703126, "miny": 41.03844854003296, "maxx": -6.215515136718751, "maxy": 41.27883851451407}'
