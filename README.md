## Quick Installation
Clone the repository. 

Run 
`npm install`

Create a .env file in the root of the directory.

Setup the env variables ie:
```
PORT=5000
MONGO_URI=mongodb+srv://admin:sc00byd00@htune-zb2qg.mongodb.net/test?retryWrites=true&w=majority
JWT_SECRET=r939398828
```

Start the backend by running  
`nodemon server.js`

CD into the client folder and run
`npm install`

Create a .env file in the root of the client folder.

Setup the env variables ie:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the client by running
```
npm start 
```

## API Routes
Scribbling here for convenience. Fully fledged documentation with working examples will be available in the future.

### User / Auth
##### Register user
```
POST http://localhost:5000/api/signup
{
	"name": "John Doe",
	"email": "john@google.co.uk",
	"password": "@secureP455w0rD!"
}
```

##### Sign in user
```
POST http://localhost:5000/api/signin
{
	"email": "john@google.co.uk",
	"password": "@secureP455w0rD!"
}
```

##### Sign out user
```
GET http://localhost:5000/api/signout
```

##### Get user by id (Admin)
This route required the user to be an admin, signed in and authtenticated.

:userId is the _id returned in the response from logging the user in.
```
GET http://localhost:5000/api/user/secret/:userId
HEADERS Authorization: Bearer Token
```

##### Get user by id
Returns the logged in user profile.
:userId is the _id returned in the response from logging the user in.
```
GET http://localhost:5000/apu/user/:userId
HEADERS Authorization: Bearer Token
```

##### Update user profile
Updates the logged in users profile.
```
PUT http://localhost:5000/apu/user/:userId
HEADERS Authorization: Bearer Token
```

### Categories
##### Create Category (Admin only)
This route required the user to be an admin, signed in and authtenticated.

:userId is the _id returned in the response from logging the user in.
```
POST http://localhost:5000/api/category/create/:userId
{
	"name": "Category 1"
}
HEADERS Authorization: Bearer Token
```

##### Get categories
Returns a list of categories
```
GET http://localhost:5000/api/categories
```

##### Update category by id (Admin only)
categoryId is the id category retrieved from the database or the get categories api.
```
PUT http://localhost:5000/api/category/:categoryId
HEADERS Authorization: Bearer Token
BODY name
```

##### Delete category by id (Admin only)
categoryId is the id category retrieved from the database or the get categories api.
```
DELETE http://localhost:5000/api/category/:categoryId
HEADERS Authorization: Bearer Token
```

##### Category by id
categoryId is required and is the database defined ID. Grab it from the database or use the get categories call to return the category list.
```
GET http://localhost:5000/api/category/:categoryId
```

##### Get categories
Returns a list of category ids.
```
GET http://localhost:5000/api/product/categories
```

### Products
##### Create product (Admin only)
This route required the user to be an admin, signed in and authenticated.

Category ID should be used for the category body.
```
POST http://localhost:5000/api/product/create/5de7d9bb5abac41fe09eede4
HEADERS Authorization: Bearer Token
BODY name, description, price, category, shipping, quantity
``` 
##### Get products
Params are optional and interchangable. Examples are:

`&order=X`, `&sortBy=ASC/DESC/createdAt/sold`, `&limit=X`, `offset=X`

To return all latest products use `&sortBy=createdAt`. To return most popular products use `&sortBy=sold`.

Pagination can be created by using limit and offset.
```
GET http://localhost:5000/api/products
PARAMS (Optional) sortBy, limit, order
EG: http://localhost:5000/api/products&sortBy=sold&order=desc&limit=20&offset=2
``` 

##### Product by id
Product ID is returned when creating a product, or alternatively grab it from the database.
```
GET http://localhost:5000/api/product/:productId
```  

##### Delete product by id (Admin only)
This route required the user to be an admin, signed in and authenticated.

Product ID is returned when creating a product, or alternatively grab it from the database.
```
DELETE http://localhost:5000/api/product/:productId/:userId
HEADERS Authorization: Bearer Token
``` 

##### Update product by id (Admin only)
This route required the user to be an admin, signed in and authenticated.

Product ID is returned when creating a product, or alternatively grab it from the database.
```
PUT  http://localhost:5000/api/product/:productId/:userId
HEADERS Authorization: Bearer Token
BODY name, description, price, category, shipping, quantity
``` 

##### Related products
Product ID is returned when creating a product, or alternatively grab it from the database.
```
GET http://localhost:5000/api/products/related/:productId/
``` 

### Search
Find products via search. Requires form data to be sent.
```
POST http://localhost:5000/api/products/search
```