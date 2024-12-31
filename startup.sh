#!/bin/bash

# git submodule init
# git submodule update

set +a
source .env.local
set -a

docker stop drone-strapi drone-next
docker container rm drone-strapi drone-next

docker build --network host -t drone-strapi \
    --build-arg STRAPI_EMAIL=$STRAPI_EMAIL \
    --build-arg STRAPI_PASSWORD=$STRAPI_PASSWORD \
    ./Drone-Strapi

docker run \
    --mount type=bind,src=./Drone-Strapi/src,dst=/app/src \
    --mount type=bind,src=./Drone-Strapi/public,dst=/app/public \
    --env-file .env.local \
    --name drone-strapi \
    -d \
    --network host \
    drone-strapi

sleep 30

node set-auth-token.mjs

docker build --network host -t drone-next \
    --build-arg STRAPI_AUTH_TOKEN=$(cat auth-token) \
    .

#    -p 3000:3000 \
docker run \
    --name drone-next \
    -d \
    --network host\
    drone-next

