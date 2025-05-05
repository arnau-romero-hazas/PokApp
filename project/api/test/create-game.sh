curl -X POST http://localhost:8080/games \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2Y3N2E5ZmM4ZjE4YjIxNmFiODVkMzciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQ2MjkyNTZ9.ZQFluN3VgbJSZgad5V-7CfoGM4sYLkh8wungqt3lzAI' -H 'Content-type: application/json' \
 -d '{
        "title":"timbita definitiva",
        "season":"season 2",
        "date":"13-04-2025",
        "place":"bodega"
    }' -v