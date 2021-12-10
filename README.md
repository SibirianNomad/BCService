# Blockchain application

### Add variable for Web3 provider HTTP_PROVIDER, WSS_PROVIDER and 	exchange contract address CONTRACT_ADDRERSS

#### Make sure that your database config DB_NAME, DB_HOST, DB_USER, DB_PASS in .env is correct

### Install all dependencies

`npm install`

#### This application work with Postgres

#### Run migrations and seeders for creating data in DB

`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`

#### Api documentation you can see at http://your-domain/api/documentation

### You can import postman api route for testing from postman-api-testing/blockchain.postman_collection.json

## This application is only for testing, so be careful with your private key
