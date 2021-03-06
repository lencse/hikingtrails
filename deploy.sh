#!/usr/bin/env bash

if [ "$GITHUB_EVENT_NAME" = "push" ]
then
    echo "Deploy to Production..."
    node_modules/.bin/netlify deploy --prod | tee logs/deploy.log
fi

if [ "$GITHUB_EVENT_NAME" = "pull_request" ]
then
    echo "Deploy Preview..."
    node_modules/.bin/netlify deploy | tee logs/deploy.log
fi
