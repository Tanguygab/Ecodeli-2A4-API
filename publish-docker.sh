#!/bin/sh
read -p "Is this a production build? (y/N): " confirm

type="development"
tag="snapshot"
if [ $confirm = y ]; then
  type="production"
  tag="latest"
fi
echo "Building & pushing $type build..."
docker build --target $type -t tanguygab/ecodeli-api:$tag .
docker push tanguygab/ecodeli-api:$tag