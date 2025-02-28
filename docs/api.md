# Nos Echos API Documentation

## Base URL
```
/api
```

## Endpoints

### Testimonies

#### List Testimonies
```http
GET /api/testimonies
```

Returns a list of all approved testimonies.

**Response**
```json
[
  {
    "id": "string",
    "type": "victim" | "survivor" | "witness",
    "gender": "male" | "female" | "other",
    "age": "under18" | "18-24" | "25-34" | "35-44" | "45plus",
    "location": {
      "region": "string",
      "city": "string",
      "district": "string"
    },
    "content": "string",
    "createdAt": "date",
    "status": "pending" | "approved" | "rejected"
  }
]
```

#### Create Testimony
```http
POST /api/testimonies
```

Create a new testimony.

**Request Body**
```json
{
  "type": "victim" | "survivor" | "witness",
  "gender": "male" | "female" | "other",
  "age": "under18" | "18-24" | "25-34" | "35-44" | "45plus",
  "location": {
    "region": "string",
    "city": "string",
    "district": "string"
  },
  "content": "string"
}
```

**Response**
```json
{
  "id": "string",
  "type": "victim" | "survivor" | "witness",
  "gender": "male" | "female" | "other",
  "age": "under18" | "18-24" | "25-34" | "35-44" | "45plus",
  "location": {
    "region": "string",
    "city": "string",
    "district": "string"
  },
  "content": "string",
  "createdAt": "date",
  "status": "pending"
}
```

#### Get Testimony
```http
GET /api/testimonies/{id}
```

Get a specific testimony by ID.

**Response**
```json
{
  "id": "string",
  "type": "victim" | "survivor" | "witness",
  "gender": "male" | "female" | "other",
  "age": "under18" | "18-24" | "25-34" | "35-44" | "45plus",
  "location": {
    "region": "string",
    "city": "string",
    "district": "string"
  },
  "content": "string",
  "createdAt": "date",
  "status": "pending" | "approved" | "rejected"
}
```

#### Update Testimony
```http
PATCH /api/testimonies/{id}
```

Update a specific testimony. Only administrators can update the status.

**Request Body**
```json
{
  "status": "approved" | "rejected"
}
```

**Response**
```json
{
  "id": "string",
  "type": "victim" | "survivor" | "witness",
  "gender": "male" | "female" | "other",
  "age": "under18" | "18-24" | "25-34" | "35-44" | "45plus",
  "location": {
    "region": "string",
    "city": "string",
    "district": "string"
  },
  "content": "string",
  "createdAt": "date",
  "status": "pending" | "approved" | "rejected"
}
```

#### Delete Testimony
```http
DELETE /api/testimonies/{id}
```

Delete a specific testimony. Only administrators can delete testimonies.

**Response**
```json
{
  "message": "Testimony deleted successfully"
}
```

## Error Responses

All endpoints can return the following error responses:

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 404 Not Found
```json
{
  "error": "Testimony not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
``` 