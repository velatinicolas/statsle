#!/bin/bash

loadValue() {
  echo `grep $1 .env | cut -d= -f2`
}

FRONT_SERVER_HOST=`loadValue FRONT_SERVER_HOST`
FRONT_SERVER_USER=`loadValue FRONT_SERVER_USER`
FRONT_SERVER_PATH=`loadValue FRONT_SERVER_PATH`

scp -r front/dist/* $FRONT_SERVER_USER@$FRONT_SERVER_HOST:$FRONT_SERVER_PATH