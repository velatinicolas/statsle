# Generate encryption key

```
hexdump -vn16 -e'4/4 "%08X" 1 "\n"' /dev/urandom
```

Store it in API's `.env` file, key `ENCRYPTION_KEY`.

# Add user

```
curl -X POST http://localhost:3000/users/ -H "Content-Type: application/json" -d '{"username":"statsleAdmin","password":"stasleAdmin","email":"admin@statsle.com"}'
```

If admin, then in DB:

```
UPDATE users SET role = 'admin' WHERE username = 'statsleAdmin';
```

# Log in

```
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"statsleAdmin","password":"stasleAdmin"}'
{"access_token":"<JWT_TOKEN>"}
```

# Create challenge

```
curl -X POST http://localhost:3000/challenges/ -H "Content-Type: application/json" -H "Authorization: Bearer <JWT_TOKEN>" -d '{"name":"Sutom","url":"https://sutom.nocle.fr/"}'
```