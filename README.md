This project contains a full stack application built using React+Tailwindcss for the frontend and Nodejs express server for the backend.

#### Steps to run the project:

```
git clone ""
cd reddit
```

Before we start the server, we should configure the env variables. For this project we have a single variable which is the mongo db uri. Put that in the .env file

After we have successfully cloned the project and set env variables, we will start by setting up the backend.

```
cd reddit-backend
npm install
node index.js
```

This should start the backend server.

We will now start the frontend server.

```
cd reddit-frontend
npm install
npm run start
```
