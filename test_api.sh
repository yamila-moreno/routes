curl -v "http://localhost:3000/rpc/get_routes?select=name" \
  -X POST -H "Content-Type: application/json" \
  -d '{
	"maxx": 43.06640625000001,
	"maxy": 71.85622888185527,
	"minx": -137.81250000000003,
	"miny": -12.039320557540572
  }'
