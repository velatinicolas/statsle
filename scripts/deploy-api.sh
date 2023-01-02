#!/bin/bash

loadValue() {
  echo `grep $1 .env | cut -d= -f2`
}

API_SERVER_HOST=`loadValue API_SERVER_HOST`
API_SERVER_USER=`loadValue API_SERVER_USER`
API_SERVER_PATH=`loadValue API_SERVER_PATH`

scp -r api/dist/* $API_SERVER_USER@$API_SERVER_HOST:$API_SERVER_PATH
scp api/.env.prod $API_SERVER_USER@$API_SERVER_HOST:$API_SERVER_PATH/.env
scp api/package*.json $API_SERVER_USER@$API_SERVER_HOST:$API_SERVER_PATH
ssh $API_SERVER_USER@$API_SERVER_HOST "cd $API_SERVER_PATH && npm install"