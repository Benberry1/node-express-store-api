# Node & Express Store API

This project's objective was to build the API to deliver a set of products to the store's frontend. No frontend exists for the store in this project however I did put together a very basic HTML/CSS with a product link to see the list of products.

The products are stored on MongoDB Atlas with the API deployed on Heroku and accessible [here](https://node-express-store-api.herokuapp.com/).

## Dependencies

- Express
- Mongoose
- express-async-errors
- dotenv

## Dev Dependencies

- Nodemon

## Get Started

You are free to clone the code, however the database is via Mongo Atlas. There is a way to get access to the local environment via Docker and MongoDB Compass. If you would like to do so then there will be some instructions below.

### Products Schema

```json
{
  "_id": "62a293791180e60621082add",
  "name": "chair",
  "price": "100",
  "company": "ikea",
  "featured": true,
  "rating": 4.5,
  "createdAt": { "$date": "2022-06-10T00:42:32.489+00:00" }
}
```

- \_id is populated by mongoDB with a unique id and createdAt is a date with a default value of Date.now()

### Access API via your browser

1. Visit the [Node & Express Store API](https://node-express-store-api.herokuapp.com/).
2. Click on 'products' and you will see that your browser redirects to the endpoint '/api/v1/products' - You are only able to GET the products in this API as the focus was to deliver the products. While also offering parameters in order to filter.

3. To explore the funtionality of the API you can use a dekstop client such as Insomnia or Postman to make your GET request. Or simply change the address directly in your browser.

Below is a table of parameters you are able to make:

| Parameters     | Type   | Description                                                                                                                                                                                                    | Example                                    |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| featured       | string | This parameter accepts a true or false string in order to filter whether a product is featured or not                                                                                                          | /api/v1/products?featured=true             |
| company        | string | Accepts one of 4 company options for this API: "ikea", "liddy", "caressa", "marcos". Allowing to filter by brand/company                                                                                       | /api/v1/products?company=ikea              |
| name           | string | This accepts a string and matches the string input to the product name. Regex is used to match, an example of this is searching 'albany'. This will return products that have albany in their name             | /api/v1/products?name=albany               |
| numericFilters | string | The data model has two number fields; price and rating. To search for a specific number value you are able to use mathematical operators: >, <, =, <=, >=, along with either 'price' or 'rating' in the query. | /api/v1/products?numericFilters=price>100  |
| sort           | string | Using sort you are able to pick what fields you would like to sort. You can also use a hyphen to reverse the order. E.g., price or -price.                                                                     | /api/v1/products?sort=price                |
| fields         | string | Fields can be used to detail what you would like to see in your response. You can have multiple feilds in the query and seperate them with a comma.                                                            | /api/v1/products?fields=name,price,company |
| page & limit   | string | The API supports pagination. Page number can be detailed entering a number and limit can be used to detail the products per page.                                                                              | /api/v1/products?page=2&limit=5            |

### Access in local environment with Docker & MongoDB compass

1. First step is to clone this repo into the directory you would like.
2. Type `npm install` into your terminal while inside the project folder to install all dependencies.
3. Ensure you have [MongoDB Compass](https://www.mongodb.com/products/compass) & [Docker Desktop](https://www.docker.com/get-started/) installed.
4. When installed, type the following code into your terminal to startup your docker container:

```
   docker run --name node-express-store-api \
   -p 27017:27017 \
   -v node-express-store-api-mongodb_data_container:/data/db \
   -d \
   mongo
```

This will setup a docker container running an instance of mongodb.

5. Open up MongoDB compass and click on the connect button. The default connection address should be "mongodb://localhost:27017". If it is not then change it to this address.
6. In the server.js file change the `process.env.MONGO_URI` to 'mongodb://localhost:27017/node-express-store-api'. This will ensure your application connects to your local database.
7. In your terminal type `npm run start:dev` to start your server.js.
8. In order to populate your mongo database with the required files you can run `node populate.js` to insert the products.json into you mongodb compass. You will need to also change the MONGO_URI in populate.js to 'mongodb://localhost:27017/node-express-store-api' for this to work.
9. This will now allow you to run the API locally and you can visit 'http://localhost:5001' in your browser to view the Store API page.
