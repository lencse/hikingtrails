#!/usr/bin/env bash

if [ "$GITHUB_EVENT_NAME" = "push" ]
then
    echo "Deploy to Production..."
    node_modules/.bin/netlify deploy --prod
fi

if [ "$GITHUB_EVENT_NAME" = "pull_request" ]
then
    echo "Deploy Preview..."
    node_modules/.bin/netlify deploy
fi