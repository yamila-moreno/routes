curl "http://localhost:3000/rpc/get_routes?select=name" \
  -X POST -H "Content-Type: application/json" \
  -d '{ "minx": -142.64648437500003, "miny": 41.934976500546604, "maxx": -86.48437500000001, "maxy": 63.01510569831989 }'
