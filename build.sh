#!/bin/bash

VERSION="$1"

[ -n "$VERSION" ] || exit 1

export VERSION

envsubst < index.html.tmpl > index.html
docker build -t alyvusal/demo-app:$VERSION .
rm index.html
docker tag alyvusal/demo-app:$VERSION alyvusal/demo-app:latest
docker push alyvusal/demo-app:$VERSION
docker push alyvusal/demo-app:latest
