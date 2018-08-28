# Server API-Endpoints

**Register**
* URL 
    GET /api/v1/register
* Data
    { user: 'user', password: 'password'}
* Response
  * Success
    * Code: 200
      Content: { token: 'tokenvalue'}
  * Error
    * Code: 401
      Content: 
		`{ errorcode: 1, error: 'Username already used'}`