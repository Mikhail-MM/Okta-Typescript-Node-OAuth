# Project Information
Connecting TypeScript with NodeJS/Express/PostGreSQL to build Auth Systems. Frontend Powered by Vue & Material UI.
OAuth connections using 0Auth library, as well as FaceBook/Google/Github/LinkedIn Auth Endpoints.
#### Installing PostGres
First, Install Docker. 
Then, Run these commands in your OS CLI:

`docker pull postgres:latest`

`docker run -d --name guitar-db -p 5432:5432 -e 'POSTGRES_PASSWORD=p@ssw0rd42' postgres`

(Note: If you already have PostgreSQL installed locally, you will need to change the -p parameter to map port 5432 to a different port that does not conflict with your existing instance of PostgreSQL.)

(Remember to connect to the Docker Virtual Machine IP, not directly to localhost!)

#### References 
This project was built following this tutorial:
[Use TypeScript to Build a Node API with Express](https://developer.okta.com/blog/2018/11/15/node-express-typescript)

