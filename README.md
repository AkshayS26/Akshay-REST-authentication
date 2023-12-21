# Brainstorm Assignment
## REST Api authentication 

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/express-jwt-server.git
   ```

2. Navigate to the project directory:
   ```bash
      npm install
    ```  
3. start the server:
    ```bash
      node index.js
    ```

## Testing Endpoints
1. #Generate JWT Token:

- Use a tool like Postman or curl to test the /login endpoint.

- Send a POST request to http://localhost:3000/login with the following JSON body:
   ```bash
       {
          "username": "yourusername"
        } 
  ```
- You should receive a JSON response containing an accessToken

2. #Access Protected Endpoint:
   - Use the obtained accessToken to test the /capsules endpoint.
   - Send a GET request to http://localhost:3000/capsules with the Authorization header:
      ```bash 
        Authorization: Bearer YOUR_ACCESS_TOKEN
      ```
   - If the token is valid, you should receive a response containing capsule data.

## This is a overview of logic I would have used for authenthication.
