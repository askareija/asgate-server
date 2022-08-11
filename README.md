# Asgate - Server
ASGate is an application for turning your android phones into SMS gateway. This repository is only for backend server which will be listening to client REST API request.

## How It Works
First, API server will be running for accepting REST API methods that will be used to interact with user. Then the client connect to the API server using WebSocket and listening for send-sms event from API.