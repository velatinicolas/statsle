# TODO

## FEAT

- SEO !!
- Weekly or monthly contest
- Sorts
- Leaderboard

## API

- try to add some alerting on 500 errors
- remove dist before prod build, so old file are removed -> should be good
- npm run console broken in production
- countOccurences with character array
- Invalidate JWT on password change (and also, invalidate old JWT after logout?) -> sign jwt with combination of logout date + password hash?
- Fix vulnerabilities
- Add parsers
- Factorize stuff in parsers
- Encrypt usernames?
- Implement a fast endpoint to check JWT (/me fetches DB)
- Rearrange file tree
- Unit tests
- CI Github Actions

## FRONT

- Share single result
- Stop loading all turn list, paginate!
- Retest this 	A	@	217.160.238.7
- https://stackoverflow.com/a/11733363
- Disable Vue dev tools in production
- Clean display for turns
- Rearrange file tree
- Unit tests
- CI Github Actions

## RETOURS BETATEST

- traductions
- ordonner les résultats différemment
- séparer EN vs FR
- catégoriser les jeux (mots, films, etc)
- pouvoir filtrer dans l'affichage des résultats
- classement style "tu fais partie des meilleurs"
- easter egg pour féliciter si tu fais tous les jeux xD
- gérer ces jeux:
  + https://www.chronophoto.app/daily.html
  + https://zaratustra.itch.io/dordle 
  + https://octordle.com/
  + https://qntm.org/files/absurdle/absurdle.html que j'adore mais qui rend fou
  + https://www.spotify.com/heardle/? le blind test quotidien
  + https://jonesnxt.github.io/kilordle/
  + https://solitaired.com/wordhurdle
  + phrazle sur le même site 
  + et clue sur le même site

# Configure PROD

## Postgres

```
sudo apt-get install vim

# Install / This comes from postgresql.org
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql

# It seems that postgresql already creates the postgres user and the main cluster.
# Also, the cluster is already launched on server start. So let's use it.
su postgres
psql -U postgres # This may work!
CREATE USER statle WITH PASSWORD 'PASSWORDHERE' CREATEDB;
CREATE DATABASE statle;
GRANT ALL ON SCHEMA public TO statle;
ALTER DATABASE statle OWNER TO statle;


# Add group "statle"
CTRL+D
addgroup statle
usermod -a -G statle postgres
adduser front --ingroup statle
adduser api --ingroup statle

# Create front storage
chown root:statle /srv
chmod 775 /srv
su front
mkdir -p /srv/www/front

# Nginx
sudo apt-get install nginx
# store certificates in
# /etc/ssl/statsle/statsle_ssl.crt (concatenate both initial and intermediate certificate)
# /etc/ssl/statsle/statsle_ssl.key
touch /etc/nginx/sites-available/statle
ln -s /etc/nginx/sites-available/statle /etc/nginx/sites-enabled/statle
vim /etc/nginx/sites-available/statle
# Fill with content:
## Redirect www non-SSL server
#server {
#    listen 80;
#    server_name www.statsle.fr;
#    return 301 https://www.statsle.fr$request_uri;
#}
#
## Redirect non-www non-SSL server
#server {
#    listen 80;
#    server_name statsle.fr;
#    return 301 https://www.statsle.fr$request_uri;
#}
#
## Main www SSL server
#server {
#    listen 443 ssl;
#    ssl_certificate /etc/ssl/statsle/statsle_ssl.crt;
#    ssl_certificate_key /etc/ssl/statsle/statsle_ssl.key;
#    server_name www.statsle.fr;
#    charset utf-8;
#    root    /srv/www/front;
#    index   index.html index.htm;
#    location / {
#        root /srv/www/front;
#        try_files $uri /index.html;
#    }
#    error_log  /var/log/nginx/statle-error.log;
#    access_log /var/log/nginx/statle-access.log;
#}
#
#server {
#    listen 443 ssl;
#    ssl_certificate /etc/ssl/statsle/statsle_ssl.crt;
#    ssl_certificate_key /etc/ssl/statsle/statsle_ssl.key;
#    server_name api.statsle.fr;
#    charset utf-8;
#    location / {
#        proxy_pass http://localhost:3000;
#        proxy_http_version 1.1;
#        proxy_set_header Upgrade $http_upgrade;
#        proxy_set_header Connection 'upgrade';
#        proxy_set_header Host $host;
#        proxy_cache_bypass $http_upgrade;
#    }
#    error_log /var/log/nginx/statle-api-error.log;
#    access_log /var/log/nginx/statle-api-access.log;
#}


nginx -t # should be ok
service nginx restart

# API
mkdir /srv/www/api
chown api:statle /srv/www/api
apt-get install npm
npm install -g npm@8
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
npm install pm2@latest -g
pm2 start /srv/www/api/src/main.js --name statle-api
pm2 startup systemd
pm2 save

