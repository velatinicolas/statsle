#!/bin/bash

NUMBER=$1

echo "INSERT INTO turns VALUES"

for i in `seq 1 $NUMBER`; do
    UUID=`uuidgen`
    echo "('$UUID', NOW(), 'raw', NOW(), NOW(), 1, 'a1d20805-56ad-4d3d-84f5-1dcc4e0b3789', 'LOST', '0')";
    if [[ "$i" -ne "$NUMBER" ]]; then
        echo ","
    else
        echo ";"
    fi
done