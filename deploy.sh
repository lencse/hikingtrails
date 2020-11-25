#!/usr/bin/env bash

if [ "$GITHUB_EVENT_NAME" = "push" ]
then
    node_modules/.bin/netlify deploy --prod
fi

if [ "$GITHUB_EVENT_NAME" = "pull_request" ]
then
    node_modules/.bin/netlify deploy
fi
