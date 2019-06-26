# Noteful API
A node/express API server as well as postgres database migrations and seeding files to support my Noteful React client. 

## Set up

Complete the following steps to implement the project:

1. Clone this repository to local: `git clone https://github.com/mgwedd/noteful-api`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm i`
5. Move the example Environment file `example.env` to `.env`, which will be ignored by git and read by the express server `mv example.env .env`. Adjust those environment variables as needed.
6. Create a postgres database called `noteful` and alter the `.env` file's variables to declare the environment variables postgrator requires for running migrations. They're listed in `postgrator-config.js`. 
7. Edit the contents of the `package.json` to use Noteful API instead of `"name": "express-boilerplate",`

## Scripts

Start the app: `npm start`

Start nodemon for the app: `npm run dev`

Run migration scripts: `npm run migration`

Run tests: `npm test`

Run debugger: `npm debug`

## Deploying

When the new project is ready for deployment, add a new Heroku app with `heroku create`. This will make a new git remote called "heroku". Then `npm run deploy`, which will push to this remote's master branch after auditing your packages (a predeploy script).
