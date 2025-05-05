curl -X POST http://localhost:8080/seasons -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2Y3N2E5ZmM4ZjE4YjIxNmFiODVkMzciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQ2MjkyNTZ9.ZQFluN3VgbJSZgad5V-7CfoGM4sYLkh8wungqt3lzAI' -d '{
    "name":"Season 2",
    "startDate": "2025-04-14T00:00:00.000Z",
    "endDate": "2025-05-14T00:00:00.000Z"
    }' -v