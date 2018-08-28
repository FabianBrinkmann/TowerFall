# Server API-Endpoints

**Register**
* URL 
    POST /api/v1/register
* Data
    `{ 'user': 'user', 'password': 'password'}`
* Response
  * Success
    * Code: 200
    * Content: `{ 'token': 'tokenvalue'}`
  * Error
    * Code: 409
    * Content: eg `{ 'code': 1, explanation: 'Username already used'}`

**Login**
* URL 
    POST /api/v1/login
* Data
    `{ 'user': 'user', 'password': 'password'}`
* Response
  * Success
    * Code: 200
    * Content: `{ 'token': 'tokenvalue'}`
  * Error
    * Code: 401
      