#!/bin/bash

loadValue() {
  echo `grep $1 .env | cut -d= -f2`
}

API_SERVER_HOST=`loadValue API_SERVER_HOST`
API_SERVER_USER=`loadValue API_SERVER_USER`
API_SERVER_PATH=`loadValue API_SERVER_PATH`
API_SERVER_ROOT=`loadValue API_SERVER_ROOT`

echo "#####################"
echo "# DEPLOY STATLE API #"
echo "#####################"

echo "Building project..."
make api-build

echo "Uploading sources..."
rsync -av --delete-after api/dist/ $API_SERVER_USER@$API_SERVER_HOST:$API_SERVER_PATH

echo "Installing node_modules..."
ssh $API_SERVER_USER@$API_SERVER_HOST "cd $API_SERVER_PATH && npm install"

echo "Restarting API..."
ssh $API_SERVER_ROOT@$API_SERVER_HOST "pm2 restart statle-api"

echo "Done!"