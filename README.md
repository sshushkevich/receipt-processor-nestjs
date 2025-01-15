# Receipt Processor (NestJS)
This is the implementation of Receipt Processor API specification described here - https://github.com/fetch-rewards/receipt-processor-challenge

It's similar to the project https://github.com/shushkevich/receipt-processor , but it is built using a different tech stack (NestJS and JavaScript/TypeScript).

## Tech stack
- TypeScript
- NestJS
- MongoDB

## Highlights
- New rules can be added without changing of underlying service
- Points calculation endpoint is cached
- Input validation
- Added tests

## Installation
There is no need to install Java or Maven - only Docker is required.

Clone the repository:
```
git clone https://github.com/shushkevich/receipt-processor-nestjs.git
```

Run the Docker Container
```
docker-compose up --build
```

## Testing
REST API is available at:
```
http://localhost:3001
```

MongoDB is available at `27018` port.

### Test data
Use Process Receipts endpoint to add new receipts:

```
POST http://localhost:3001/receipts/process
```

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```

Use Get Points endpoint to get number of points awarded. For the receipt above it should return:
```
GET localhost:3001/receipts/{receipt-id}/points
```

```json
{
  "points": 28
}
```

