# Statsle (beta)

## What is it?

Gather stats of your daily challenges!

Statsle is hosted here: https://www.statsle.fr/.

## How to run it locally?

### Prerequisites

Be sure that `docker`, `docker-compose` and `make` are installed on your computer.

Clone the project:

```
git clone git@github.com:velatinicolas/statsle.git
cd statsle
```

### Steps to be done once

Create a volume for the database:

```
docker volume create --name statsle-db -d local
```

Create API and front configuration files from `.dist` files:

```
cp api/.env.dist api/.env
cp front/.env.dist front/.env
```

If you want to provide your own `JWT_PRIVATE_KEY` or `ENCRYPTION_KEY`, you can use the following command:

```
hexdump -vn16 -e'4/4 "%08X" 1 "\n"' /dev/urandom
```

If you want to be able to send mails for password recoveries, you'll have to provide your own credentials for your mail server in environments variables `MAIL_TRANSPORT_*`.

Install all node_modules:

```
make install-all
```

Execute the containers:

```
make start
```

Keep an eye on the logs:

```
make logs
```

Then go to: http://localhost:5173 to open Statsle in your favourite web browser.

Create your first user by filling the "Sign in" form, and check that you can successfully log in afterward.

Switch your user as admin so you can create your first challenge:

```
make postgres
UPDATE users SET role = 'admin' WHERE username = '<username>';
```

There is no admin interface for now, so create your first challenge by directly calling the API:

```
# Get JWT
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"<username>","password":"<password>"}'
{"access_token":"<JWT_TOKEN>"}

# Create Sutom challenge
curl -X POST http://localhost:3000/challenges -H "Content-Type: application/json" -H "Authorization: Bearer <JWT_TOKEN>" -d '{"name":"Sutom","url":"https://sutom.nocle.fr/"}'
```

Then go to http://localhost:5173, play your Sutom challenge for today, paste the result, and you're done!