# Receipt-Processor-Fetch

First, ensure that you have Docker installed on your machine.
### Run application:
Run these commands in order:
```
docker build -t receipt .
docker run -p 4000:4000 receipt
```
### Test the application:
While the server is running, run the command:
```
npm test
```
OR
Launch the server using these commands:
```
docker build -t receipt .
docker run -p 4000:4000 receipt npm test
```

Then, using Postman or another tool that can send HTTP requests, first send a POST request with your specific receipt with the JSON as the body of the request. This will generate an id for that receipt and send a response with that id. Then, send a GET request using that specific id to retrieve the point value of that receipt.