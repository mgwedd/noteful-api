# Noteful API
A node/express API server as well as postgres database migrations and seeding files to support my **[Noteful React client](https://github.com/mgwedd/noteful)**

## Dev Setup

Complete the following steps to implement the project:

1. Clone this repository to local: `git clone https://github.com/mgwedd/noteful-api`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm i`
5. Move the example Environment file `example.env` to `.env`, which will be ignored by git and read by the express server `mv example.env .env`. Adjust those environment variables as needed.
6. Run `npm run migrate` to set up the db

## Scripts

Start the server: `npm start`

Start the server with nodemon (recommended): `npm run dev`

Run migration scripts: `npm run migration` (dev) or `npm run migration-prod` (prod)

Run tests: `npm test`

Run debugger: `npm debug`

## Deploying

When the new project is ready for deployment, add a new Heroku app with `heroku create`. This will make a new git remote called "heroku". Then `npm run deploy`, which will push to this remote's master branch after auditing your packages (a predeploy script).

To deploy the database to production:
1. `heroku create`
2. `heroku addons:create heroku-postgresql:hobby-dev`
3. `heroku pg:credentials:url` (copy configs to .env to satisfy the `postgrator-prod-config.js` requirements)
4. `npm run migrate-prod`
5. `npm run deploy`
4. `npm run migrate-prod`
