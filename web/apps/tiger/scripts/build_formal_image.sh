#!/bin/bash

# The absolute path of the top-level directory.
REPO_DIR=${REPO_DIR:-$(git rev-parse --show-toplevel)}
[[ -n $REPO_DIR ]] || (
  echo >&2 "Failed to find working directory"
  exit 1
)

cd $REPO_DIR/apps/tiger

# set up agora server.
if [ -n "$1" ]; then
  if [ "$1" == "test" ]; then
    echo "REACT_APP_AGORA_SERVER_IP=xhd.lab.deepmirror.com" > .env
  else
    echo "REACT_APP_AGORA_SERVER_IP=$1" > .env
  fi
else 
  echo "REACT_APP_AGORA_SERVER_IP=xhd.deepmirror.com.cn" > .env
fi

echo "HTTPS=true" >> .env

if [ -n "$1" ]; then
  echo "PORT=38000" >> .env
else 
  echo "PORT=443" >> .env
fi

echo "SSL_CRT_FILE=../.certs/server.crt" >> .env
echo "SSL_KEY_FILE=../.certs/server.key" >> .env

# install 
yarn bootstrap

# build
yarn prod
rm -rf ./docker/dist
mv ./dist ./docker/

$REPO_DIR/tools/build_image.sh tiger-web apps/tiger/docker