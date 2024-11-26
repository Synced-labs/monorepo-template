#!/bin/bash

# Usage: ./deploy.sh <environment> <service> <version>
# Example: ./deploy.sh staging backend 1.0.0

ENVIRONMENT=$1
SERVICE=$2
VERSION=$3

if [ -z "$ENVIRONMENT" ] || [ -z "$SERVICE" ] || [ -z "$VERSION" ]; then
    echo "Usage: ./deploy.sh <environment> <service> <version>"
    exit 1
fi

# Deploy with Helm
helm upgrade --install $SERVICE-$ENVIRONMENT ./helm/charts/$SERVICE \
    --namespace $ENVIRONMENT \
    --set image.tag=$VERSION \
    --values ./helm/charts/$SERVICE/values-$ENVIRONMENT.yaml \
    --atomic \
    --timeout 5m0s