#!/bin/bash

loadValue() {
  echo `grep $1 .env | cut -d= -f2`
}

FRONT_SERVER_HOST=`loadValue FRONT_SERVER_HOST`
FRONT_SERVER_USER=`loadValue FRONT_SERVER_USER`
FRONT_SERVER_PATH=`loadValue FRONT_SERVER_PATH`


echo "#######################"
echo "# DEPLOY STATLE FRONT #"
echo "#######################"

echo "Building project..."
make front-build

echo "Uploading sources..."
rsync -av --delete-after front/dist/ $FRONT_SERVER_USER@$FRONT_SERVER_HOST:$FRONT_SERVER_PATH